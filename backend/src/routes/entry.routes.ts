// src/routes/entry.routes.ts

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware';

const entryRoutes = Router();
const prisma = new PrismaClient();

// Rota para CRIAR uma nova entrada (protegida)
// POST /api/entries
// @ts-ignore
entryRoutes.post('/', authMiddleware, async (req: Request, res: Response) => {
  // ADICIONE ESTA LINHA PARA DEBUGAR
  console.log("DADOS RECEBIDOS NO BODY:", req.body);
  // @ts-ignore
  const userId = req.userId;
  const {
    entryType,
    betType,
    title,
    casaDeAposta,
    stake,
    odds, // Corrigido de 'odd' para 'odds' para bater com o que o front envia
    status
  } = req.body;

  try {
    const bookmaker = await prisma.bookmaker.findFirst({
      where: { name: casaDeAposta, userId: userId }
    });

    if (!bookmaker) {
      return res.status(404).json({ message: `Casa de aposta '${casaDeAposta}' não encontrada.` });
    }

    const { status } = req.body; // Vem como "Pendente"

    const statusMap: { [key: string]: 'PENDING' | 'WON' | 'LOST' | 'VOID' } = {
      'Pendente': 'PENDING',
      'Ganha': 'WON',
      'Perdida': 'LOST',
      'Anulada': 'VOID'
    };
    const dbStatus = statusMap[status];

    if (!dbStatus) {
      return res.status(400).json({ message: `Status '${status}' é inválido.` });
    }

    // MUDANÇA: Adicionamos um mapa de tradução para o TIPO
    const tipoMap: { [key: string]: 'NORMAL' | 'PROTECTION' } = {
      'normal': 'NORMAL',
      'protecao': 'PROTECTION'
    };
    const dbEntryType = tipoMap[entryType];

    if (!dbEntryType) {
      return res.status(400).json({ message: `Tipo '${entryType}' é inválido.` });
    }

    const result = await prisma.$transaction(async (tx) => {
      const newBetGroup = await tx.betGroup.create({
        data: { userId, name: title }
      });

      const newEntry = await tx.entry.create({
        data: {
          title,
          betType: betType.toUpperCase() as 'BACK' | 'LAY',
          entryType: dbEntryType, // Usa o tipo já traduzido
          stake,
          odds,
          status: dbStatus,
          userId,
          bookmakerId: bookmaker.id,
          betGroupId: newBetGroup.id,
        }
      });

      return newEntry;
    });

    // MUDANÇA CRÍTICA: Busque a entrada recém-criada novamente para incluir a casa
    const entryWithBookmaker = await prisma.entry.findUnique({
      where: { id: result.id },
      include: {
        bookmaker: true // Inclui os dados da casa de aposta
      }
    });

    res.status(201).json(entryWithBookmaker);

  } catch (error) {
    console.error("ERRO AO CRIAR ENTRADA:", error);
    res.status(500).json({ message: "Erro ao criar a entrada." });
  }
});

// Rota para LISTAR as entradas do usuário logado (protegida)
// GET /api/entries
// @ts-ignore
entryRoutes.get('/', authMiddleware, async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;

  try {
    const entries = await prisma.entry.findMany({
      where: {
        userId: userId,
      },
      // Isso é importante: Pede ao Prisma para incluir os dados da casa de aposta relacionada
      include: {
        bookmaker: true,
      },
      // Ordena as entradas da mais nova para a mais antiga
      orderBy: {
        betDate: 'desc',
      }
    });

    res.status(200).json(entries);

  } catch (error) {
    console.error("ERRO AO BUSCAR ENTRADAS:", error);
    res.status(500).json({ message: "Erro ao buscar as entradas." });
  }
});

// Rota para DELETAR uma entrada (protegida)
// DELETE /api/entries/:id
entryRoutes.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: "Não autorizado." });

  try {
    // Verifica se a entrada pertence ao usuário logado antes de deletar
    const entry = await prisma.entry.findFirst({
      where: { id: id, userId: userId }
    });

    if (!entry) {
      return res.status(404).json({ message: "Entrada não encontrada ou não pertence a este usuário." });
    }

    // Se pertence, pode deletar
    await prisma.entry.delete({
      where: { id: id },
    });

    res.status(204).send();

  } catch (error) {
    console.error("ERRO AO DELETAR ENTRADA:", error);
    res.status(500).json({ message: "Erro ao deletar a entrada." });
  }
});

// Rota para ATUALIZAR uma entrada (protegida)
// PUT /api/entries/:id
entryRoutes.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Não autorizado." });

  // Pegamos os mesmos dados do formulário
  const { title, stake, odds, status } = req.body;

  try {
    // Verificação de segurança: A entrada pertence a este usuário?
    const entry = await prisma.entry.findFirst({
      where: { id: id, userId: userId }
    });
    if (!entry) {
      return res.status(404).json({ message: "Entrada não encontrada." });
    }

    // Traduz o status para o formato do banco
    const statusMap: { [key: string]: 'PENDING' | 'WON' | 'LOST' | 'VOID' } = {
      'Pendente': 'PENDING', 'Ganha': 'WON', 'Perdida': 'LOST', 'Anulada': 'VOID'
    };
    const dbStatus = statusMap[status];

    const updatedEntry = await prisma.entry.update({
      where: { id: id },
      data: { title, stake, odds, status: dbStatus },
      include: { bookmaker: true } // Inclui a casa para a resposta ser completa
    });

    res.status(200).json(updatedEntry);

  } catch (error) {
    console.error("ERRO AO ATUALIZAR ENTRADA:", error);
    res.status(500).json({ message: "Erro ao atualizar a entrada." });
  }
});

export default entryRoutes;
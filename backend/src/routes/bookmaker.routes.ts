// src/routes/bookmaker.routes.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middlewares/auth.middleware'; // Nosso "segurança"

const bookmakerRoutes = Router();
const prisma = new PrismaClient();

// Rota para CRIAR uma nova casa de aposta (protegida)
// @ts-ignore
bookmakerRoutes.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { name, login, encryptedPassword, minDeposit, minWithdrawal } = req.body;
  // @ts-ignore
  const userId = req.userId;

  try {
    const newBookmaker = await prisma.bookmaker.create({
      data: {
        name,
        login,
        encryptedPassword,
        minDeposit,
        minWithdrawal,
        userId,
      },
    });
    res.status(201).json(newBookmaker);
  } catch (error) {
    console.error("ERRO AO CRIAR CASA:", error); // ADICIONE ESTA LINHA
    res.status(500).json({ message: "Erro ao criar a casa de aposta." });
  }
});

// Rota para LISTAR as casas do usuário logado (protegida)
// @ts-ignore
bookmakerRoutes.get('/', authMiddleware, async (req: Request, res: Response) => {
  // ADICIONE ESTA LINHA PARA DEBUGAR
  // @ts-ignore
  console.log('CONTEÚDO DO REQ.USER:', req.user);

  // @ts-ignore
  const userId = req.userId;

  try {
    const bookmakers = await prisma.bookmaker.findMany({
      where: { userId: userId },
    });
    res.status(200).json(bookmakers);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar as casas de aposta." });
  }
});

// DELETE /api/bookmakers/:id
// @ts-ignore
bookmakerRoutes.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  // @ts-ignore
  const userId = req.userId;

  try {
    // Primeiro, verifica se a casa de aposta pertence ao usuário logado
    const bookmaker = await prisma.bookmaker.findFirst({
      where: { id: id, userId: userId }
    });

    if (!bookmaker) {
      return res.status(404).json({ message: "Casa de aposta não encontrada ou não pertence a este usuário." });
    }

    // Se pertence, pode deletar
    await prisma.bookmaker.delete({
      where: { id: id },
    });

    res.status(204).send(); // 204 No Content = sucesso, sem corpo de resposta

  } catch (error) {
    console.error("ERRO AO DELETAR CASA:", error);
    res.status(500).json({ message: "Erro ao deletar a casa de aposta." });
  }
});

// PUT /api/bookmakers/:id
// @ts-ignore
bookmakerRoutes.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, login, encryptedPassword, minDeposit, minWithdrawal } = req.body;
  // @ts-ignore
  const userId = req.userId;

  try {
    // Verifica se a casa pertence ao usuário antes de atualizar
    const bookmaker = await prisma.bookmaker.findFirst({
      where: { id: id, userId: userId }
    });

    if (!bookmaker) {
      return res.status(404).json({ message: "Casa de aposta não encontrada ou não pertence a este usuário." });
    }

    // Se pertence, atualiza com os novos dados
    const updatedBookmaker = await prisma.bookmaker.update({
      where: { id: id },
      data: { name, login, encryptedPassword, minDeposit, minWithdrawal }
    });

    res.status(200).json(updatedBookmaker);

  } catch (error) {
    console.error("ERRO AO ATUALIZAR CASA:", error);
    res.status(500).json({ message: "Erro ao atualizar a casa de aposta." });
  }
});

export default bookmakerRoutes;
// src/routes/user.routes.ts

import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const userRoutes = Router();
const prisma = new PrismaClient();

// Rota: POST /api/users/register
// @ts-ignore
userRoutes.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    // 1. Validação básica
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // 2. Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // 3. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10); // O 10 é o "custo" do hash

    // 4. Cria o usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, // Salva a senha criptografada
      },
    });

    // 5. Retorna uma resposta de sucesso (sem a senha!)
    res.status(201).json({ 
      message: 'Usuário criado com sucesso!',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

// Rota: POST /api/users/login
// @ts-ignore
userRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Validação básica
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // 2. Procura o usuário no banco de dados
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // 3. Compara a senha enviada com a senha criptografada no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // 4. Se tudo estiver certo, cria o "crachá" (Token JWT)
    const token = jwt.sign(
      { id: user.id, email: user.email }, // O que vamos guardar dentro do token
      process.env.JWT_SECRET as string,    // Nossa chave secreta
      { expiresIn: '8h' }                 // Tempo de validade do token
    );

    // 5. Envia o token de volta para o cliente
    res.status(200).json({
      message: 'Login bem-sucedido!',
      token: token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

export default userRoutes;
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// MUDANÇA: Vamos estender a interface Request do Express globalmente
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    // MUDANÇA: Em vez de req.user, vamos usar req.userId, que é mais simples
    req.userId = decoded.id; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};
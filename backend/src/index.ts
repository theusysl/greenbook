// backend/src/index.ts

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import bookmakerRoutes from './routes/bookmaker.routes';
import entryRoutes from './routes/entry.routes';

const app = express();
const port = 3001;

// MUDANÇA: Configuração explícita do CORS
// Isso diz: "Qualquer pedido vindo de http://localhost:3000 é permitido"
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api/users', userRoutes); 
app.use('/api/bookmakers', bookmakerRoutes);
app.use('/api/entries', entryRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
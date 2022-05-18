import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();
app.use(cors()); // CORS é necessário para permitir acesso de outros domínios
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});

// GET, POST, PUT, DELETE methods
// GET = Buscar informações 
// POST = Criar informações
// PUT = Atualizar informações
// PATH = Atualizar informações unicas
// DELETE = Deletar informações
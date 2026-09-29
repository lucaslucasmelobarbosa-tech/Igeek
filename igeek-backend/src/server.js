import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { login } from './controllers/authController.js';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from './controllers/postController.js';
import { getCommentsByPost, createComment } from './controllers/commentController.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota de Teste
app.get('/', (req, res) => {
  res.json({ message: "API iGEEK funcionando com sucesso! 🎯" });
});

// --- ROTAS DE AUTENTICAÇÃO ---
app.post('/api/auth/login', login);

// --- ROTAS DE ANÁLISES / REVIEWS ---
app.get('/api/posts', getAllPosts);
app.get('/api/posts/:id', getPostById);

// Somente Sogeking com Token pode criar, editar ou excluir!
app.post('/api/posts', authMiddleware, createPost);
app.put('/api/posts/:id', authMiddleware, updatePost);
app.delete('/api/posts/:id', authMiddleware, deletePost);

// --- ROTAS DO FÓRUM / COMENTÁRIOS ---
app.get('/api/posts/:postId/comments', getCommentsByPost);
app.post('/api/posts/:postId/comments', createComment);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iGEEK rodando na porta ${PORT}`);
});

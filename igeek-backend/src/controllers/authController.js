import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
  const { email, password } = req.body;

  const adminEmail = "sogeking@igeek.com";
  // Senha: "reiDosAtiradores123"
  const adminPasswordHash = await bcrypt.hash("reiDosAtiradores123", 10);

  if (email !== adminEmail) {
    return res.status(400).json({ error: 'Credenciais inválidas.' });
  }

  const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Credenciais inválidas.' });
  }

  // Gera o token JWT para o Sogeking
  const token = jwt.sign(
    { id: 1, name: "Sogeking", role: "ADMIN" },
    process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_do_sogeking',
    { expiresIn: '7d' }
  );

  return res.json({
    user: { name: "Sogeking", role: "ADMIN" },
    token
  });
}
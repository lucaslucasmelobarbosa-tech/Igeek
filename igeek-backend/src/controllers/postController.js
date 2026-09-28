let posts = [
  {
    id: "1",
    title: "Arcane: 2ª Temporada",
    type: "Filmes",
    rating: 9.8,
    synopsis: "A conclusão do embate entre Piltover e Zaun supera todas as expectativas visuais e narrativas.",
    content: "Arcane entrega uma das maiores produções de animação da história. A profundidade dos personagens Jinx e Vi atinge o ápice emocional.",
    pros: ["Animação espetacular", "Desenvolvimento de personagens", "Trilha sonora imersiva"],
    cons: ["Ritmo acelerado no episódio 4"],
    author: "Sogeking",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "O Problema dos Três Corpos",
    type: "Livros",
    rating: 9.2,
    synopsis: "Uma obra-prima da ficção científica hard que redefine o primeiro contato com civilizações alienígenas.",
    content: "Cixin Liu constrói uma narrativa densa e fascinante baseada em física quântica e dilemas filosóficos profundos.",
    pros: ["Conceitos científicos fascinantes", "Trama imprevisível"],
    cons: ["Personagens levemente frios"],
    author: "Sogeking",
    createdAt: new Date().toISOString()
  }
];

export function getAllPosts(req, res) {
  return res.json(posts);
}

export function getPostById(req, res) {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: "Análise não encontrada." });
  return res.json(post);
}

export function createPost(req, res) {
  const { title, type, rating, synopsis, content, pros, cons } = req.body;

  if (!title || !type || !rating || !content) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
  }

  const newPost = {
    id: String(posts.length + 1),
    title,
    type,
    rating: parseFloat(rating),
    synopsis: synopsis || "",
    content,
    pros: pros || [],
    cons: cons || [],
    author: "Sogeking",
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);
  return res.status(201).json({ message: "Análise publicada com sucesso pelo Sogeking!", post: newPost });
}

export function deletePost(req, res) {
  const { id } = req.params;
  posts = posts.filter(p => p.id !== id);
  return res.json({ message: "Análise removida com sucesso." });
}
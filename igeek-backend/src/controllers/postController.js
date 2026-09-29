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
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800",
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
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800",
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
  const { title, type, rating, synopsis, content, image } = req.body;

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
    pros: [],
    cons: [],
    author: "Sogeking",
    image: image || "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800",
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);
  return res.status(201).json({ message: "Análise publicada com sucesso pelo Sogeking!", post: newPost });
}

// NOVA FUNÇÃO: PERMITE EDITAR POSTAGENS
export function updatePost(req, res) {
  const { id } = req.params;
  const { title, type, rating, synopsis, content, image } = req.body;

  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: "Análise não encontrada." });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title: title || posts[postIndex].title,
    type: type || posts[postIndex].type,
    rating: rating ? parseFloat(rating) : posts[postIndex].rating,
    synopsis: synopsis !== undefined ? synopsis : posts[postIndex].synopsis,
    content: content || posts[postIndex].content,
    image: image || posts[postIndex].image
  };

  return res.json({ message: "Análise atualizada com sucesso!", post: posts[postIndex] });
}

export function deletePost(req, res) {
  const { id } = req.params;
  posts = posts.filter(p => p.id !== id);
  return res.json({ message: "Análise removida com sucesso." });
}

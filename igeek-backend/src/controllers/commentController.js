let comments = [
  {
    id: "c1",
    postId: "1",
    authorName: "AnáliseGeek",
    text: "Concordo totalmente com a nota! A cena de luta no episódio 6 foi incrível.",
    likes: 12,
    createdAt: new Date().toISOString()
  }
];

export function getCommentsByPost(req, res) {
  const { postId } = req.params;
  const postComments = comments.filter(c => c.postId === postId);
  return res.json(postComments);
}

export function createComment(req, res) {
  const { postId } = req.params;
  const { authorName, text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "O texto do comentário é obrigatório." });
  }

  const newComment = {
    id: `c${comments.length + 1}`,
    postId,
    authorName: authorName || "Visitante Geek",
    text,
    likes: 0,
    createdAt: new Date().toISOString()
  };

  comments.push(newComment);
  return res.status(201).json(newComment);
}
import * as articleRepository from "../repositories/sqlArticleRepository.js";

// Get all articles by journalist ID
export async function getArticlesByJournalistId(req, res) {
  try {
    const articles = await articleRepository.getArticlesByJournalistId(req.params.id);
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles by journalist ID:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all articles by journalist name
export async function getArticlesByJournalistName(req, res) {
  try {
    const articles = await articleRepository.getArticlesByJournalistName(req.params.name);
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles by journalist name:", error);
    res.status(500).json({ message: "Server error" });
  }
}

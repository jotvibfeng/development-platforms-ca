import { Router } from "express";
import { pool } from "../db/connection";
import { ArticleWithAuthor } from "../interface";
import { authenticateToken } from "../middlewares/auth-validation";

const router = Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles with author information
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Successfully retrieved articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Article's unique identifier
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: Article title
 *                     example: "How to Build a REST API"
 *                   body:
 *                     type: string
 *                     description: Article content
 *                     example: "This article explains how to build a REST API..."
 *                   submitted_by:
 *                     type: integer
 *                     description: ID of the user who submitted the article
 *                     example: 1
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: When the article was created
 *                     example: "2025-12-20T10:30:00Z"
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Email of the article author
 *                     example: "author@example.com"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch articles"
 */

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT articles.id, articles.title, articles.body, articles.submitted_by, articles.created_at, users.email
            FROM articles
            JOIN users ON articles.submitted_by = users.id`
    );

    const articles = rows as ArticleWithAuthor[];
    res.json(articles);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - category
 *               - submitted_by
 *             properties:
 *               title:
 *                 type: string
 *                 description: Article title
 *                 example: "How to Build a REST API"
 *               body:
 *                 type: string
 *                 description: Article content
 *                 example: "This comprehensive guide will teach you how to build a REST API from scratch..."
 *               category:
 *                 type: string
 *                 description: Article category
 *                 example: "Technology"
 *               submitted_by:
 *                 type: integer
 *                 description: ID of the user submitting the article
 *                 example: 1
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article created successfully"
 *                 articleId:
 *                   type: integer
 *                   description: ID of the newly created article
 *                   example: 123
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create article"
 */
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, body, category, submitted_by } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)`,
      [title, body, category, submitted_by]
    );

    res.status(201).json({
      message: "Article created successfully",
      articleId: (result as any).insertId,
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Failed to create article" });
  }
});

export default router;

const express = require("express");
const postsDB = require("../../data/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await postsDB.find();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsDB.findById(id);
    post.length
      ? res.status(200).json(post)
      : res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  console.log(post);

  try {
    if (!post.title || !post.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      const { id } = await postsDB.insert(req.body);
      const addedPost = await postsDB.findById(id);
      res.status(201).json(addedPost);
    }
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, contents } = req.body;
    const post = await postsDB.findById(id);
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    if (!title || !contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      await postsDB.update(id, req.body);
      const post = await postsDB.findById(id);
      res.status(200).json(post);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsDB.findById(id);
    if (!post.length) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      await postsDB.remove(id);

      res.status(200).json({ message: "The post has been deleted" });
    }
  } catch (err) {
    res.status(500).json({
      error: "The post could not be removed"
    });
  }
});

module.exports = router;

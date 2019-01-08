// import your node modules

const express = require("express");
const db = require("./data/db.js");
const server = express();
// add your server code starting here
server.use(express.json());
server.listen(5000, () => console.log("server is running"));

server.get("/api/posts", (req, res) => {
  db.find()
    .then(post => {
      res.send({ post });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  //req comes from the front-end, res comes from the database
  //back-end is more like a bridge between the FE and DB
  const { id } = req.params;
  //look into the DB and find the object with matching id
  db.findById(id)
    .then(post => {
      if (post.length) {
        res.send({ post });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.post("/api/posts", (req, res) => {
  const postInfo = req.body;
  console.log(postInfo);
  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(postInfo)
      .then(postID =>
        db
          .findById(postID.id)
          .then(post => res.status(201).json(post))
          .catch(err =>
            res.status(500).json({
              error: "There was an error while saving the post to the database"
            })
          )
      )
      .catch(err =>
        res.status(500).json({
          error: "insert failed"
        })
      );
  }
});
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length) {
        db.remove(id)
          .then(
            res
              .status(200)
              .json({ message: `The post with the id ${id} has been deleted` })
          )
          .catch(err =>
            res.status(500).json({ error: "The post could not be removed" })
          );
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => res.status(500).json({ error: "findById failed" }));
});
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  db.findById(id)
    .then(post => {
      if (!post.length) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (title === undefined || contents === undefined) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        db.update(id, { title, contents })
          .then(count => {
            db.findById(id)
              .then(post => {
                res.status(200).json(post);
              })
              .catch(err =>
                res.status(500).json({ error: "Cannot find post by the ID" })
              );
          })
          .catch(err =>
            res
              .status(500)
              .json({ error: "The post information could not be modified." })
          );
      }
    })
    .catch(err =>
      res.status(500).json({ error: "Cannot find post by the ID" })
    );
});

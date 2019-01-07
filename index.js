// import your node modules

const express = require("express");
const db = require("./data/db.js");
const server = express();
// add your server code starting here
server.listen(5000, () => console.log("server is running"));

server.get("/api/posts", (req, res) => {
  db.find()
    .then(post => {
      console.log(res);
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

const server = require("./api/server");
const postsRoute = require("./api/routes/postsRoute");

server.use("/api/posts", postsRoute);

const port = 5000;
server.listen(port, () => {
  console.log(`🔥  Server running on port :${port} 🔥`);
});

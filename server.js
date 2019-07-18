const http = require("http");
const app = require("./app");
const db = require("./db");

//Configures the server port
const port = process.env.PORT || 5000;

//Connect to the database(in db.js), then start the server with the app compiled from app.js
db.connect().then(() => {
  const server = http.createServer(app);
  server.listen(port, () => console.log(`Server started on port ${port}`));
});

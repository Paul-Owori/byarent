const http = require("http");
const app = require("./app");
const db = require("./db");

//Configures the server port
const port = process.env.PORT || 5000;

//Link the server and the app
const server = http.createServer(app);

//Connect to the database(in db.js), then start the server
db.connect().then(() => {
  server.listen(port, () => console.log(`Server started on port ${port}`));
});

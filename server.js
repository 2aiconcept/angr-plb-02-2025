const jsonServer = require("json-server");
const auth = require("json-server-auth"); // Import du middleware d'authentification
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("mock_db/db.json"); // Charge votre fichier de données JSON
const middlewares = jsonServer.defaults();

// Active CORS
server.use(cors());

// Active le middleware d'authentification
server.db = router.db;
server.use(auth);
server.use(middlewares);
server.use(router);

// Définit le port d'écoute
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});

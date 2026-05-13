require("dotenv").config(); // Súper importante al inicio
const express = require("express"); // ¡Te faltaba esta línea vital!
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Auth funcionando");
});

app.use("/api/auth", authRoutes);

// Una sola conexión limpia a la base de datos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar a Mongo:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`),
);

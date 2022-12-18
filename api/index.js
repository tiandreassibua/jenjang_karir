import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db.js";
import routePegawai from "./routes/pegawai.js";
import routeKinerja from "./routes/kinerja.js";
import routeGolongan from "./routes/golongan.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/pegawai", routePegawai);
app.use("/api/kinerja", routeKinerja);
app.use("/api/golongan", routeGolongan);

db.connect((err) => {
  if (err) {
    throw err;
  }
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
import express from "express";
import router from "./routes/routes";
import { TestDBService } from "./tests/testdb";

const app = express();
app.use(express.json());
app.use("/", router);

const port = 3000;

if (process.argv[2] === "teste") {
  try {
    TestDBService.getTestData();
  } catch (error: any) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

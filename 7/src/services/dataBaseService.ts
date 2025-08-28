import pgp from "pg-promise";
import dotenv from "dotenv";
import process from "process";

const initOptions = {};
const pgpInstance = pgp(initOptions);

dotenv.config();

export const cn = {
  //host: "localhost",
  //port: 5432,
  //database: "Entrev_",
  //user: "postgres",
  //password: "Michael10",
  //PGPORT=5432

  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: String(process.env.PGPASSWORD),
};

export const db = pgpInstance(cn);

try {
  db.connect()
    .then((obj: any) => {
      console.log("Conectado ao PostgreSQL:", cn.database);
      obj.done();
    })
    .catch((error: any) => {
      console.error("Erro ao conectar ao PostgreSQL:", error.message || error);
      process.exit(1);
    });
} catch (error) {
  console.error("Erro inesperado:", error);
}

export default db;

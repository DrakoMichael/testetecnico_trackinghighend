import pgp from "pg-promise";
import dotenv from "dotenv";

const initOptions = {};
const pgpInstance = pgp(initOptions);

dotenv.config();

export const cn = {
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
};

export const db = pgpInstance(cn);

db.connect()
  .then((obj) => {
    console.log("Conectado ao PostgreSQL:", cn.database);
    obj.done();
  })
  .catch((error) => {
    console.error("Erro ao conectar ao PostgreSQL:", error.message || error);
    process.exit(1);
  });

export default db;

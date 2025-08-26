// CRUD USANDO EXPRESS
//
// exemplo:
//{
//  "full_name": "Maria Oliveira",
//  "contact": {
//    "email": "maria@teste.com",
//    "phone": "11999998888"
//  }
//}
//

class User {
  constructor(fullName, email, phone) {
    this.fullName = fullName;
    this.contact = {
      email: email || null,
      phone: phone || null,
    };
  }
}

// colocado de maneira manual para exemplo
let user = new User("Maria Oliveira", "maria@teste.com", "11999998888");

//supondo que use mysql
//db é o obj da classe que faz a instância com o banco de dados (ou algo do tipo)
//query é a string da consulta SQL
//melhor ser usado algum ORM no lugar disso

const query = "INSERT INTO leads (nome, email, telefone) VALUES (?, ?, ?)";
db.query(
  query,
  [user.fullName, user.contact.email, user.contact.phone],
  (err, _result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao salvar lead");
    }
    res.status(200).send("Lead salvo com sucesso!");
  }
);

const express = require("express");
const app = express();
const { createPool } = require("mysql");

let conn = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bootcamp",
});

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/mahasiswa", (req, res) => {
  conn.query("SELECT * FROM mahasiswa", (err, result) => {
    if (err) throw err;
    const data = {
      error: 0,
      datas: JSON.parse(JSON.stringify(result)),
    };
    return res.status(200).send(data);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { name, fakultas } = req.body;
  console.log(name);
  console.log(fakultas);
  conn.query(
    "INSERT INTO mahasiswa (name,fakultas) VALUES(?,?)",
    [name, fakultas],
    (err, result) => {
        if(err) throw err

        return res.status(201).send({
            message : 'Berhasil menambahkan data mahasiswa'
        })
    }
  );
});

app.listen(8080, console.log("jalan 8080"));

const express = require('express');
const connection = require("../database/connection")
const router = express.Router();

router.get('/', function (_req, res, _next) {
  connection.query(
    'SELECT * from users;',
    (err, rows) => {
      if (err) throw err
      res.json(rows);
    })
});

router.get('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'SELECT * from users WHERE id = ?;',
    id,
    (err, rows) => {
      if (err) throw err
      res.json(rows[0]);
    })
});

router.post('/', function (req, res, _next) {
  const { username, password, first_name, last_name, email, tel } = req.body

  connection.query(
    'INSERT INTO users (username, password, first_name, last_name, email, tel) VALUES (?, ?, ?, ?, ?, ?);',
    [username, password, first_name, last_name, email, tel],
    (err, rows) => {
      if (err) throw err
      res.json({ id: rows.insertId });
    })
});

router.put('/:id', function (req, res, _next) {
  const { id } = req.params
  const { username, password, first_name, last_name, email, tel, status } = req.body

  connection.query(
    'UPDATE users SET username=?, password=?, first_name=?, last_name=?, email=?, tel=?, status=? WHERE id = ?;',
    [username, password, first_name, last_name, email, tel, status, id],
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

router.delete('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'DELETE FROM users WHERE id = ?;',
    id,
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

module.exports = router;
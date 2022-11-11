const express = require('express');
const connection = require("../database/connection")
const router = express.Router();

// GET /users
router.get('/', function (_req, res, _next) {
  connection.query(
    'SELECT * from user;',
    (err, rows) => {
      if (err) throw err
      res.json(rows);
    })
});

router.get('/customer', function (_req, res, _next) {
  connection.query(
    'SELECT * from user WHERE role = 0;',
    (err, rows) => {
      if (err) throw err
      res.json(rows);
    })
});

// GET /users/1
router.get('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'SELECT * from user WHERE id = ?;',
    id,
    (err, rows) => {
      if (err) throw err
      res.json(rows[0]);
    })
});

// POST /users
router.post('/', function (req, res, _next) {
  const { username, password, firstname, lastname, email, tel } = req.body

  connection.query(
    'INSERT INTO user (username, password, firstname, lastname, email, tel) VALUES (?, ?, ?, ?, ?, ?);',
    [username, password, firstname, lastname, email, tel],
    (err, rows) => {
      if (err) throw err
      res.json({ id: rows.insertId });
    })
});

// PUT /users/1
router.put('/:id', function (req, res, _next) {
  const { id } = req.params
  const { username, password, firstname, lastname, email, tel, status } = req.body

  connection.query(
    'UPDATE user SET username=?, password=?, firstname=?, lastname=?, email=?, tel=?, status=? WHERE id = ?;',
    [username, password, firstname, lastname, email, tel, status, id],
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

// DELETE /users/1
router.delete('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'DELETE FROM user WHERE id = ?;',
    id,
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

module.exports = router;
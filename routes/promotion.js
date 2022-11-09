const express = require('express');
const connection = require("../database/connection")
const router = express.Router();

// GET /users
router.get('/', function (_req, res, _next) {
  connection.query(
    'SELECT * from promotion;',
    (err, rows) => {
      if (err) throw err
      res.json(rows);
    })
});

// GET /users/1
router.get('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'SELECT * from promotion WHERE id = ?;',
    id,
    (err, rows) => {
      if (err) throw err
      res.json(rows[0]);
    })
});

// POST /users
router.post('/', function (req, res, _next) {
  const { code, name, price } = req.body

  connection.query(
    'INSERT INTO promotion (code, name, price) VALUES (?, ?, ?);',
    [code, name, price],
    (err, rows) => {
      if (err) throw err
      res.json({ id: rows.insertId });
    })
});

// PUT /users/1
router.put('/:id', function (req, res, _next) {
  const { id } = req.params
  const { code, name, price } = req.body

  connection.query(
    'UPDATE promotion SET code=?, name=?, price=? WHERE id = ?;',
    [code, name, price, id],
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

// DELETE /users/1
router.delete('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'DELETE FROM promotion WHERE id = ?;',
    id,
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

module.exports = router;
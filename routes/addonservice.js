const express = require('express');
const connection = require("../database/connection")
const router = express.Router();

// GET /users
router.get('/', function (_req, res, _next) {
  connection.query(
    'SELECT * from addonservice;',
    (err, rows) => {
      if (err) throw err
      res.json(rows);
    })
});

// GET /users/1
router.get('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'SELECT * from addonservice WHERE id = ?;',
    id,
    (err, rows) => {
      if (err) throw err
      res.json(rows[0]);
    })
});

// POST /users
router.post('/', function (req, res, _next) {
  const {name, price} = req.body

  connection.query(
    'INSERT INTO addonservice (name, price) VALUES (?, ?);',
    [name, price],
    (err, rows) => {
      if (err) throw err
      res.json({ id: rows.insertId });
    })
});

// PUT /users/1
router.put('/:id', function (req, res, _next) {
  const { id } = req.params
  const {name, price} = req.body

  connection.query(
    'UPDATE addonservice SET name=?, price=? WHERE id = ?;',
    [name, price, id],
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

// DELETE /users/1
router.delete('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'DELETE FROM addonservice WHERE id = ?;',
    id,
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

module.exports = router;
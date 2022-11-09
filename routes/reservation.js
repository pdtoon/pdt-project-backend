const express = require('express');
const connection = require("../database/connection")
const router = express.Router();

// GET /users
router.get('/', function (_req, res, _next) {
  connection.query(
    'SELECT * from reservation;',
    (err, rows) => {
      if (err) throw err
      res.json(rows);
    })
});

// GET /users/1
router.get('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'SELECT * from reservation WHERE id = ?;',
    id,
    (err, rows) => {
      if (err) throw err
      res.json(rows[0]);
    })
});

// POST /users
router.post('/', function (req, res, _next) {
  const { userid, meetingroomid, start, stop, totalprice, status } = req.body

  connection.query(
    'INSERT INTO reservation (userid, meetingroomid, start, stop, totalprice, status) VALUES (?, ?, ?, ?, ?, ?);',
    [userid, meetingroomid, start, stop, totalprice, status],
    (err, rows) => {
      if (err) throw err
      res.json({ id: rows.insertId });
    })
});

// PUT /users/1
router.put('/:id', function (req, res, _next) {
  const { id } = req.params
  const { userid, meetingroomid, start, stop, totalprice, status } = req.body

  connection.query(
    'UPDATE reservation SET userid=?, meetingroomid=?, start=?, stop=?, totalprice=?, status=? WHERE id = ?;',
    [userid, meetingroomid, start, stop, totalprice, status, id],
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

// DELETE /users/1
router.delete('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'DELETE FROM reservation WHERE id = ?;',
    id,
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

module.exports = router;
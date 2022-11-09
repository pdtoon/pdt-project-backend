const express = require('express');
const connection = require("../database/connection")
const router = express.Router();

// GET /users
router.get('/', function (_req, res, _next) {
  connection.query(
    'SELECT * from meetingroom;',
    (err, rows) => {
      if (err) throw err
      res.json(rows);
    })
});

// GET /users/1
router.get('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'SELECT * from meetingroom WHERE id = ?;',
    id,
    (err, rows) => {
      if (err) throw err
      res.json(rows[0]);
    })
});

// POST /users
router.post('/', function (req, res, _next) {
  const { roomnumber, name, support, detail, price, status, image } = req.body

  connection.query(
    'INSERT INTO meetingroom (roomnumber, name, support, detail, price, status, image) VALUES (?, ?, ?, ?, ?, ?, ?);',
    [roomnumber, name, support, detail, price, status, image],
    (err, rows) => {
      if (err) throw err
      res.json({ id: rows.insertId });
    })
});

// PUT /users/1
router.put('/:id', function (req, res, _next) {
  const { id } = req.params
  const { roomnumber, name, support, detail, price, status, image } = req.body

  connection.query(
    'UPDATE meetingroom SET roomnumber=?, name=?, support=?, detail=?, price=?, tel=?, status=?, image=? WHERE id = ?;',
    [roomnumber, name, support, detail, price, status, image, id],
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

// DELETE /users/1
router.delete('/:id', function (req, res, _next) {
  const { id } = req.params

  connection.query(
    'DELETE FROM meetingroom WHERE id = ?;',
    id,
    (err, _rows) => {
      if (err) throw err
      res.json({ id });
    })
});

module.exports = router;
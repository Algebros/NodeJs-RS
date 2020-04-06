const router = require('express').Router();
const boardService = require('./board.service.js');

router.route('/').get(async (req, res) => {
  const allBoard = await boardService.getAll();
  res.json(allBoard);
});

router.route('/').post(async (req, res) => {
  const board = await boardService.createBoard(req.body);
  if (!board) return res.status(404).json({ err: 'Board not found' });
  res.json(board);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.getBoardById(req.params.id);
  if (!board) return res.status(404).json({ err: 'Board not found' });
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.updateBoard(req.params.id, req.body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardService.deleteBoard(req.params.id);
  res.json(board);
});

module.exports = router;

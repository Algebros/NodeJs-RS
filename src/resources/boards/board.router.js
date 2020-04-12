const router = require('express').Router();
const { ErrorHandler, catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');
const boardService = require('./board.service.js');

router.route('/').get(
  catchErrors(async (req, res) => {
    const allBoard = await boardService.getAll();
    res.json(allBoard);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardService.createBoard(req.body);
    if (!board) {
      throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
    }
    res.json(board);
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await boardService.getBoardById(req.params.id);
    if (!board) {
      throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
    }
    res.json(board);
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json(board);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const board = await boardService.deleteBoard(req.params.id);
    res.json(board);
  })
);

module.exports = router;

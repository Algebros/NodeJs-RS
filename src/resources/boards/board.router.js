/* eslint-disable no-unused-vars */
const router = require('express').Router();
const boardSchema = require('./board.model');
const { ErrorHandler, catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchErrors(async (req, res) => {
    const board = await boardSchema.find({});
    // const allBoard = await boardService.getAll();
    res.json(board);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardSchema.create(req.body);
    // const board = await boardService.createBoard(req.body);
    // if (!board) {
    //   throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
    // }
    res.json(board);
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    throw await new Error('smth went wrong');
    // const board = await boardService.getBoardById(req.params.id);
    // if (!board) {
    //   throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
    // }
    // res.json(board);
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    throw await new Error('smth went wrong');
    // const board = await boardService.updateBoard(req.params.id, req.body);
    // res.json(board);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    throw await new Error('smth went wrong');
    // const board = await boardService.deleteBoard(req.params.id);
    // res.json(board);
  })
);

module.exports = router;

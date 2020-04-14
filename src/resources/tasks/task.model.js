const { Schema, model, Types } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  userId: {
    type: Types.ObjectId,
    ref: 'userSchema'
  },
  boardId: {
    type: Types.ObjectId,
    ref: 'boardSchema'
  },
  columnId: {
    type: Types.ObjectId,
    ref: 'columnSchema'
  }
});

module.exports = model('taskSchema', taskSchema);

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'testTaskTitle',
//     order = 0,
//     description = 'test Desc',
//     userId = null,
//     boardId = null,
//     columnId = null
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }

// module.exports = Task;

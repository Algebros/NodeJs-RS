const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.toResponse = user => {
  const toString = Object.prototype.toString;
  if (toString.call(user) === '[object Array]') {
    const copyArray = user.slice();
    copyArray.forEach((item, idx, arr) => {
      const { id, name, login } = item;
      arr[idx] = { id, name, login };
    });
    return copyArray;
  }
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.statics.isValid = id => {
  return Types.ObjectId.isValid(id);
};

module.exports = model('userSchema', userSchema);

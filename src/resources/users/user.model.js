/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
const bcrypt = require('bcrypt');
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

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('userSchema', userSchema);

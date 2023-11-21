// Arquivo: models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cpf: String,
  birthday: String,
  contact: String
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

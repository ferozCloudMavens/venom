const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  transactionDate: {type: Date, default: Date.now},
  transactionType: {type: String, required: true},
  description: {type: String, required: true},
  charge: {type: Number, default: 0},
  deposit: {type: Number, default: 0},
  notes: {type: String, default: ''},
  createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Transaction', transactionSchema);

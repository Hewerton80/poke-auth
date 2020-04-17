const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nick: {
      type: String,
      required: true
  },
  pass: {
      type: String,
      required: true
  },  
},{
    timestamps: true
});

module.exports = mongoose.model('User',UserSchema);
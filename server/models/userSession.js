const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  UserId: {
    type: Number,
    default: 3
  },
  timestamp : {
    type: Date,
    default: Date.now() 
  },
  isDel: {
    type : Boolean,
   default : false
  }
});
  
module.exports = mongoose.model('Usersession', UserSessionSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true,
  },
  userEmail:{
    type: String,
    required: true,
    unique: true,
  },
  userPassword:{
        type:String,
        required:true
  },
  currentBookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CurrentServiceBooking',
  }],
  completedServiceBookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompletedServiceBooking',
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

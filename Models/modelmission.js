const mongoose = require('mongoose');

const  MissionSchema = mongoose.Schema({


  description: { type: String,
  required: true },
  date: { type: String },
  
},{
  timestamps: true  , versionKey : false 
});
 
module.exports = mongoose.model('Mission',MissionSchema);
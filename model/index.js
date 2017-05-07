"use strict";

const mongoose      = require('mongoose');
const config        = require('../config');
const db            = mongoose.connect(config.MONGO_AUTH);
const Schema        = mongoose.Schema;


const messageSchema = new Schema({
  customer_id   : String,
  responder_id  : String,
  ticket_id     : String,
  is_auto_gen   : { type: Boolean, default: false },
  confidence    : Number,
  verified_by   : String,
  gen_message   : String,
  message       : String,
  sent_by       : { type: String, default: "RESPONDER" },
  created_at    : { type: Date, required: true, default: Date.now },
  updated_at    : { type: Date, required: true, default: Date.now }
})

// Hook to update `updated_at`
messageSchema.pre('save', function(next){
  let now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = {
  Message    :   mongoose.model('Message', messageSchema)
}

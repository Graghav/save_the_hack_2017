var Message = require('../model').Message;
var _       = require('underscore');

var createMessage = function(req, res) {
  var message = req.params.message || req.body.message;

  if(_.isEmpty(message)) {
    res.status(400);
    res.send({ message: "Ticket ID Param Missing" });
  }
  else {
    Message(message).save(function(err, newMessage){
      if(err) {
        res.status(500);
        res.send({ message: err });
      }
      else {
        res.send(newMessage);
      }
    });
  }
}

var getCustomerMessages = function(req, res) {

  var customer_id = req.params.id || req.body.id;

  Message.find({ customer_id : customer_id }, function(err, messages){
    if(err) {
      res.status(500);
      res.send({ message: err });
    }
    else {
      res.send(messages);
    }
  });

}

module.exports = {
  createMessage : createMessage,
  getCustomerMessages : getCustomerMessages
}

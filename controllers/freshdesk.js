var fd = require('freshdesk-api');
var config = require('../config');

var Freshdesk = new fd(config.freshdesk_host, config.freshdesk_key);

var getAllTickets = function(req, res) {
  console.log("GETTING ALL FRESHDESK TICKETS");

  Freshdesk.listAllTickets('',function(err,data) {
    if(err) {
      console.log("ERROR IN GETTING TICKETS");
      res.status(500);
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
}

var getTicketDetails = function(req, res) {

  var ticket_id = req.params.id || req.body.id;

  console.log("GETTING TICKET DETAILS FOR : " + ticket_id);

  if(!ticket_id) {
    res.status(400);
    res.send({ message: "Ticket ID Param Missing" });
  }
  else {
    Freshdesk.getTicket(ticket_id, function(err, data){
      if(err) {
        console.log("ERROR IN GETTING TICKET DETAILS");
        res.status(500);
        res.send(err);
      }
      else {
        res.send(data);
      }
    });
  }
}

var getTicketNotes = function(req, res) {

  var ticket_id = req.params.id || req.body.id;

  console.log("GETTING TICKET NOTES FOR : " + ticket_id);

  if(!ticket_id) {
    res.status(400);
    res.send({ message: "Ticket ID Param Missing" });
  }
  else {
    Freshdesk.listAllConversations(ticket_id, function(err, data){
      if(err) {
        console.log("ERROR IN GETTING TICKET NOTES");
        res.status(500);
        res.send(err);
      }
      else {
        res.send(data);
      }
    });
  }
}

var createTicket = function(req, res) {

  console.log("CREATING A NEW TICKET");

  var ticket = req.params.ticket || req.body.ticket;

  Freshdesk.createTicket(ticket, function(err, new_ticket){
    if(err) {
      console.log("ERROR IN CREATING TICKETS");
      res.status(500);
      res.send(err);
    }
    else {
      res.send(new_ticket);
    }
  });

}


var createContact = function(req, res) {

  console.log("CREATING A NEW CONTACT");

  var contact = req.params.contact || req.body.contact;

  Freshdesk.createContact(contact, function(err, data){
    if(err) {
      console.log("ERROR IN CREATING CONTACTS");
      res.status(500);
      res.send(err);
    }
    else {
      res.send(data);
    }
  });

}

var getContacts = function(req, res) {
  console.log("GETTING ALL FRESHDESK CONTACTS");

  Freshdesk.listAllContacts('',function(err,data) {
    if(err) {
      console.log("ERROR IN GETTING CONTACTS");
      res.status(500);
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
}


var getContactDetails = function(req, res) {

  var contact_id = req.params.id || req.body.id;

  console.log("GETTING CONTACT DETAILS FOR : " + contact_id);

  if(!contact_id) {
    res.status(400);
    res.send({ message: "Ticket ID Param Missing" });
  }
  else {
    Freshdesk.getContact(contact_id, function(err, data){
      if(err) {
        console.log("ERROR IN GETTING CONTACT DETAILS");
        res.status(500);
        res.send(err);
      }
      else {
        res.send(data);
      }
    });
  }
}




module.exports = {
  getAllTickets     : getAllTickets,
  createTicket      : createTicket,
  getTicketDetails  : getTicketDetails,
  getTicketNotes    : getTicketNotes,
  getContacts       : getContacts,
  getContactDetails : getContactDetails,
  createContact     : createContact
}

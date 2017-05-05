"use strict";

const freshdesk = require('./controllers/freshdesk');
const message   = require('./controllers/message');

module.exports = function(app) {

  // Ticket Routes
	app.get('/tickets', freshdesk.getAllTickets);
  app.post('/tickets', freshdesk.createTicket);
  app.get('/tickets/:id', freshdesk.getTicketDetails);
  app.get('/tickets/:id/notes', freshdesk.getTicketNotes);

  // Message Routes
  app.post('/messages', message.createMessage);

  // Contact Routes
  app.get('/contacts', freshdesk.getContacts);
  app.get('/contacts/:id', freshdesk.getContactDetails);
  app.get('/contacts/:id/messages', message.getCustomerMessages);

}

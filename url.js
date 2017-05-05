"use strict";

const freshdesk = require('./controllers/freshdesk');

module.exports = function(app) {

  // Ticket Routes
	app.get('/tickets', freshdesk.getAllTickets);
  app.post('/tickets', freshdesk.createTicket);
  app.get('/tickets/:id', freshdesk.getTicketDetails);
  app.get('/tickets/:id/notes', freshdesk.getTicketNotes);

  // Contact Routes
  app.get('/contacts', freshdesk.getContacts);
  app.get('/contacts/:id', freshdesk.getContactDetails);

}

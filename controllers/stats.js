var _       = require('underscore');
var async   = require('async');
var fd      = require('freshdesk-api');
var config  = require('../config');

var Freshdesk = new fd(config.freshdesk_host, config.freshdesk_key);

var STATUS_CONFIG = {
  open      : 2,
  pending   : 3,
  resolved  : 4,
  closed    : 5
};

var SOURCE_CONFIG = {
  email	  : 1,
  portal	: 2,
  phone	  : 3,
  forum	  : 4,
  twitter	: 5,
  facebook:	6,
  chat	  : 7
};

var getStats = function(req, res) {

  // GETTING DASHBOARD STATS
  Freshdesk.listAllTickets('',function(err,data) {
    if(err) {
      console.log("ERROR IN GETTING TICKETS");
      res.status(500);
      res.send(err);
    }
    else {
      // GET STATS COUNT
      var ticket_stats = {};
      _.map(STATUS_CONFIG, function(val, key){
        ticket_stats[key] = _.filter(data, function(d){
          return d['status'] == val;
        }).length;
        return ;
      });

      // GET SOURCE COUNTS
      var source_stats = {};
      _.map(SOURCE_CONFIG, function(val, key){
        source_stats[key] = _.filter(data, function(d){
          return d['source'] == val;
        }).length;
        return ;
      });

      res.send({
        ticket : ticket_stats,
        source : source_stats
      });

    }
  });


}

module.exports = {
  getStats  : getStats
}

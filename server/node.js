// Configure Express and any dependencies, such as the IMAP module for Node.js.
var express = require('express'),
    app     = express(),
    Imap    = require('imap'),
    inspect = require('util').inspect;

// Attempt to make a connection to the specified IMAP server.
var imap = new Imap({
    user        : 'adam.timberlake@gmail.com',
    password    : '...',
    host        : 'imap.gmail.com',
    port        : 993,
    tls         : true,
    tlsOptions  : { rejectUnauthorized: false }
});

imap.once('ready', function once() {

    // Open the "INBOX" mailbox on the IMAP server.
    imap.openBox('INBOX', true, function() {

        // Find all of the messages since today that are unread.
        imap.search(['ALL', ['SINCE', 'Aug 28, 2013']], function(error, results) {

            // Throw an exception if we have an error.
            if (error) throw error;

            var messages = imap.fetch(results, { bodies: '' });
            console.log(results.length + ' messages');

        });

    });

});

imap.connect();

app.listen(2150);
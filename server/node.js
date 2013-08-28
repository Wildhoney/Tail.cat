// Configure Express and any dependencies, such as the IMAP module for Node.js.
var express = require('express'),
    app     = express(),
    Imap    = require('imap'),
    inspect = require('util').inspect;

// Attempt to make a connection to the specified IMAP server.
var imap = new Imap({
    user        : 'adam.timberlake+tailcat@gmail.com',
    password    : '...',
    host        : 'imap.gmail.com',
    port        : 993,
    tls         : true,
    tlsOptions  : { rejectUnauthorized: false }
});

imap.connect(function connect(error) {

    /**
     * @method exit
     * @return {Boolean}
     */
    var exit = function exit() {
        console.error(error);
        return false;
    };

    if (error) {
        // An error occurred, I'm afraid!
        return exit();
    }

    // Open the 'INBOX' on the IMAP server.
    imap.openBox('INBOX', false, function(error, box) {

        if (error) {
            // An error occurred, I'm afraid!
            return exit();
        }

    });

});

app.listen(2150);
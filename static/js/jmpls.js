/*
   This JavaScript code was generated by Jemplate, the JavaScript
   Template Toolkit. Any changes made to this file will be lost the next
   time the templates are compiled.

   Copyright 2006 - Ingy döt Net - All rights reserved.
*/

if (typeof(Jemplate) == 'undefined')
    throw('Jemplate.js must be loaded before any Jemplate template files');

Jemplate.templateMap['show.tt'] = function(context) {
    if (! context) throw('Jemplate function called without context\n');
    var stash = context.stash;
    var output = '';

    try {
//line 6 "show.tt"
if (stash.get('error')) {
output += '\n    Sorry, we had an error processing your form:<br/>\n    <div style="color: red">';
//line 3 "show.tt"
output += stash.get('error');
output += '</div>\n';
}
else {
output += '\n    Thank you for your feedback!\n';
}

output += '\n';
    }
    catch(e) {
        var error = context.set_error(e, output);
        throw(error);
    }

    return output;
}

#!/usr/bin/perl

use strict;
use warnings;

use CGI;
use JSON;
use Email::Sender::Simple qw(sendmail);
use Email::Simple;
use Email::Simple::Creator;

my $cgi = CGI->new();
my $op = JSON -> new -> utf8 -> pretty(1);

print $cgi->header('application/json;charset=UTF-8');

use Data::Dumper; 
print STDERR Dumper $cgi->Vars;

my $subject   = $cgi->param('subject')  || q{};
my $name      = $cgi->param('realname') || q{};
my $email     = $cgi->param('email')    || q{};
my $text      = $cgi->param('text')     || q{};
my $recipient = q{andy@petdance.com}; # this shouldn't be in the form
my $from      = qq{$name <$email>};

my $json;

try {
    if ( !$name || !$text ) {
        die('Missing name or text');
    }
    my $email = Email::Simple->create(
        header => [To=>$recipient, From=>$from, Subject=>$subject],
        body => $text
    );
    sendmail($email,
             {from=>$from,
             transport=>Email::Sender::Transport::Sendmail->new});
    $json = $op -> encode({
        success => 'imminent'
    });
} catch {
     $json = $op -> encode({
        error => $_
    });
} finally {
    print $json;
}

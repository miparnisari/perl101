function send_mail() {
  var subject = $('#subject').val();
  var realname = $('#realname').val();
  var email = $('#email').val();
  var text = $('#text').val();

  if (email == "") {
    alert('Name is mandatory');
    return false;
  }

  if (realname == "") {
    alert('Name is mandatory');
    return false;
  }

  if (text == "") {
    alert('Text is mandatory');
    return false;
  }

  var getUrl = '/cgi-bin/formmail.pl?subject=' + subject +
    '&realname=' + realname +
    '&email=' + email +
    '&text=' + text;

  $.ajax({
    type: 'GET',
    url: getUrl,
    success: function (data) {
      console.log("success!");
    },
    error: function (data) {
      console.log("error " + data.statusText);
    },
    done: function (data) {
      var elem = $('#feedback_form_result');
      elem.innerHTML = Jemplate.process('show.tt', data);
    }
  });

}
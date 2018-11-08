# perl101.org

## Set up

- Install a webserver (apache, etc.).
- Make sure that:
    - The "href" path defined in line 47 of "tt/page.ttml" matches
    where your CGI folder will be. It assumes it well be in "/cgi-bin".
    - Make sure that the path for the captcha pictures hardcoded in
    "tt/show_captcha.tt" is good for you. If you need to adjust the path in "show_captcha.tt", recompile the templates using the following command: `jemplate --compile tt/show_captcha.tt tt/show_result.tt > static/js/jmpls.js` (you must have Jemplate installed)
- Run `make crank`.
- Copy over the `formmail.pl` and `auth.pl` into the appropriate CGI folder
  (usually this would be `cgi-bin`)
- Make sure the paths for` $data_folder` in both files reflects where you want
  to keep the captchas. I would recommend writing a full path.
- In `formmail.pl` change the `$recipient` to your own email address. (You can comment off the entire Email::Stuff part to avoid emails entirely)

## Components

Perl101.org code has several components:

* The (source) POD files under the "s" folder:
    The POD files are the core content of perl101.org. It's written in
    POD form. You can read the documentation of how to write POD on perldoc,
    using either the command `perldoc perlpod` or googling for "perlpod".
    These POD files are rendered to HTML by the generator script documented
    below.

* The static JS, images and design under the "static" folder:
    Some things are static, such as images, the CSS layout, javascript
    functions and the sorts. You can find those in the "static" folder.
    There is basic CSS for handheld, print and web.
    Currently the only image is the Perl101 logo.
    The Javascript files are the Jemplate engine (Jemplate can be found on
    CPAN) and a compiled Template Toolkit template file to Javascript.

* The Template::Toolkit templates under the "tt" folder:
    The generation engine uses the HTMLified POD content in templates in order
    to render the complete website. These are the templates in the "tt" folder.
    There is one single template called "show.tt" which is not directly used.
    It is compiled to javascript using "jemplate" command line tool and then
    put in the JS folder in "static".

    Each section in Perl101.org is rendered independently using the
    "section.tt" template. If you want to control each section, that's the
    template you want to check out.

    It's simple HTML with Template::Toolkit tags. Template::Toolkit can be
    found on CPAN.

* All the generated files under the "build" folder:
    Once the generation script generated the files, it saves them in the
    "build" folder. The folder doesn't exist by default (Perl101.org is on
    Github.com and Git cannot monitor empty folders so you'll need to create
    this folder yourself). The generation script will alert you if it is
    missing.

    This folder can be seen as the "htdocs" or "httpdocs" people are used
    to.

* The CGI scripts used for mailing and image creation, in the main folder. Right now there are only two scripts:

    - "auth.pl": this script is not production-ready yet. It's creates captchas for the feedback form. It will try to create them in the default 'captcha' folder. You'll probably have to create it.
    - "formmail.pl": this script sends the form submitted (via AJAX) and returns an answer or error.

* The generator script in the main folder:
    The generator script goes over all the POD files in "s", renders them using
    the templates in folder "tt" and then puts them as static files in the
    "build" folder. You can specify a different "build" folder or it will
    by default look for a folder named "build".

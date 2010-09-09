var http = require('http');
var defaults = {
	domain: 'api.postmarkapp.com',
	endpoint: '/email',
	secure: false,
	token: '[your X-Postmark-Server-Token value here]',
	from: '[your Postmark verifed from address here]',
	subject: '[no subject]',
	text: '[no message]'
}
var postmark = {
	send: function(options, callback) {
		var token = options.token || defaults.token;
		var from = options.from || defaults.from;
		var secure = options.secure || defaults.secure;
		var postmarkapp = http.createClient(80, defaults.domain, secure);
		var request = postmarkapp.request('POST', defaults.endpoint,
		{'host': this.domain, 'Accept': 'application/json', 'Content-Type':'application/json','X-Postmark-Server-Token':token});
		var body = {
			"From" : from,
			"To" : (options.to || null),
			"Cc" : (options.cc || null),
			"Bcc": (options.bcc || null),
			"Subject" : (options.subject || defaults.subject),
			"Tag" : (options.tag || null),
			"HtmlBody" : (options.html || options.text),
			"TextBody" : (options.text || defaults.text),
			"ReplyTo" : (options.replyto || null),
			"Headers" : (options.headers || [])
		};
		request.end(JSON.stringify(body),'utf8');
		request.on('response', function (response) {
			var r = {};
			r.statusCode = response.statusCode;
			r.httpVersion = response.httpVersion;
			r.headers = response.headers;
			r.body = '';
			response.setEncoding('utf8');
			response.on('data', function (chunk) {
				r.body += chunk;
			});
			response.on('end', function () {
				r.body = JSON.parse(r.body);
				callback(r);
			});
		});
	}
}
exports.send = postmark.send;

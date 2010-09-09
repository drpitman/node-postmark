var postmark = require("./node-postmark");
postmark.send({
	to: 'email@example.com',
	cc: 'cc@example.com',
	subject: 'node-postmark testing',
	text: 'Just a test message from node-postmark',
}, function(response){
	console.log('RESPONSE IS ' + JSON.stringify(response));
});

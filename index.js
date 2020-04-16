const wget = require('node-wget');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let url = '';
let query = '';

if (process.argv[2]) {
	url = process.argv[2];
} else {
	console.log('Please provide a URL');
	process.exit(1);
}

if (process.argv[3]) {
	query = process.argv[3];
} else {
	console.log('Please provide a query');
	process.exit(1);
}

wget({url: url, dest: 'tmp/'},
	function (error, response, body) {
		if (error) {
			console.log(`Error: ${error}`);
		} else {
			const dom = new JSDOM(body);
			console.log(dom.window.document.querySelector(query).textContent);
		}
	}
);

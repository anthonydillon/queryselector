#! /usr/bin/env node

const jsdom = require("jsdom");
const request = require('request');
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

request(url, function (error, response, body) {
	if (error) {
		return console.log(`Error: ${error}`);
	}
	const dom = new JSDOM(body);
	const el = dom.window.document.querySelector(query);
	if (el) {
		console.log(dom.window.document.querySelector(query).textContent.trim());
	} else {
		console.log(`Error: can't find element "${query}" at ${url}`);
	}
});

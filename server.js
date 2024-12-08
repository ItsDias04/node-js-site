var http = require('http');
var fs = require('fs');
const { encode } = require('punycode');

var products;
var users_data = {
	'user': {'orders': []}
};


fs.readFile(__dirname + "/products.json", function (error, json_) {

    if (error) {
        throw error;
      }
    products = JSON.parse(json_);
    // console.log(availableDrones)
    return;
});

function read_file(path_name) {

	let res = fs.readFileSync(__dirname + path_name, 'utf8');
	// console.log(res)
	return res;
}


function myServerFunction(request, response) {
	console.log(request.url)

	if (request.url == '/getProductsForms/all') {

		// response.writeHead(200, {'Content-Type': 'application/json'});
		// response.end(JSON.stringify(products));

		let res = '';

		// console.log('\\html\\product_prew\\' + products[0]['form_name'])

		for (let i = 0; i < products.length; i++) {
			
			res += ` ` + read_file('\\html\\product_prew\\' + products[i]['form_name']);
		}

		// console.log(res);

		// response.setHeader("Content-Type", "text/html");
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.end(res);

		return;
	}

	if (request.url == '/') {

		res = read_file('\\html\\main.html')

		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.end(res);

		return;
	}

	if (request.url == '/collection/all') {

		res = read_file('\\html\\catalog.html')

		// console.log(res)

		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.end(res);

		return;
	}

	let resp = request.url.split('?')
	if (resp[0] == '/search') {

		res = read_file('\\html\\search.html')

		// console.log(res)

		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.end(res);

		return;
	}
	if (resp[0] == '/searchProducts') {
		console.log(resp)
		let __str = decodeURI(resp[1].split('&')[0].split('=')[1]);
		console.log(__str)
		let res = '';

		for (let i = 0; i < products.length; i++) {
			
			if (products[i]['name'].toLowerCase().includes(__str.toLowerCase())) {

				res += ` ` + read_file('\\html\\product_prew\\' + products[i]['form_name']);
			
			}
		
		}

		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.end(res);
	
		return;
	}
	// console.log(request.url)
	let __resp = request.url.split('/');
	// console.log(__resp)
	if (__resp[1] == 'product') {

		for (let i = 0; i < products.length; i++) {
			
			if (__resp[2] == products[i]['url'].split('/')[2]) {

				res = read_file('\\html\\product_html\\' + products[i]['name_page']);

				response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				response.end(res);
				return;
			}
		}
	}
	if (request.url.split('?')[0] == '/new_order') {

		res = read_file("\\html\\product_html\\new_order.html")

		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.end(res);
		return;
	}

	console.log(request.url)

	response.end()
	return;

}

http.createServer(myServerFunction).listen(8000);
// IMPORT MODULES
const express = require('express')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// CONFIG MODULES
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));												// set static files 
app.use(bodyParser.urlencoded({extended: true}));

// SET UP ROUTING

//GET homepage 
app.get('/', function (req, res) {
	res.render('index');
});

app.get('/like', function(req,res){
	let nameOfTheDog = req.query.dog;

	fs.readFile('./highfives.json', function(err,data){
		if (err){
			throw err
		} 
		const parsedData = JSON.parse(data);
		const nameLikedDog = parsedData.find(element => element.dogname === nameOfTheDog);
		// console.log(nameLikedDog);	// objectet kapunk { dogname: 'dog1', highfives: 0 }
		let numberOfHighfives = nameLikedDog.highfives

		res.send({number: numberOfHighfives})
	})
})

app.post('/newlike', function(req,res){
	let name = req.body.dog;

	fs.readFile('./highfives.json', function(err,data){
		if (err){
			throw err
		}
		const parsedData = JSON.parse(data);
		let nameLikedDog = parsedData.find(element => element.dogname === name);
		++nameLikedDog.highfives;

		let updatedJson = JSON.stringify(parsedData);

		fs.writeFile('./highfives.json', updatedJson, function(err){
			if (err) {
				throw err
			}
		})
	})
})


app.listen(3000, function(){
	console.log('Cute dogs app is listening at port 3000')
})
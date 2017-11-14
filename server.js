const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const app = express();
const mongodbLink = 'PLACE LINK TO MONGO DB';
var db;


// connect to the mogoserver
MongoClient.connect(mongodbLink, (err, database) => {
 	   if (err) return console.log(err)
	   db = database;
	   app.listen(3001, function() {
		  console.log('App Started');
		});
});


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ================= TODOS API ===========================
app.get('/api/todos', (req,res) => {
	db.collection('todos').find().toArray((err,result) => {
		 if (err) return console.log(err);
		 res.send({todos : result});
	});
});

// ======= modify the todo ============

// modify the quote
app.put('/api/todos', (req, res) => {
  db.collection('todos')
  .findOneAndUpdate({_id : new ObjectId(req.body.id)}, {
    $set: {
      todo : req.body.todo
     }
  	}, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
});


// delete the quote
app.delete('/api/todos', (req, res) => {
  db.collection('todos').remove({_id: new ObjectId(req.body.id)},
  (err, result) => {
	    if (err) return res.send(500, err)
	    res.send({success : true});
  });
});

// create a new quote
app.post('/api/todos', (req, res) => {
   
   let objectToInsert = req.body;
  db.collection('todos').insert(objectToInsert, (err, result) => {
	    if (err) return console.log(err)
	    const id  = objectToInsert._id;
		console.log(id);
	    res.send({success : true, id : id});
	});
});


// =============== QUOTES API ==============================

// get all the quotes
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  });
});

// modify the quote
app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
     }
  	}, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
});

// delete the quote
app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'})
  })
})

// create a new quote
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
	res.redirect('/');
  });
});
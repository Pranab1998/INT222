
const express=require('express');
const bodyParser=require('body-parser');
var MongoClient = require('mongodb').MongoClient;  
var url = "mongodb://localhost:27017/ Library";  
const Joi= require('joi')
const app=express();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res)
{
	res.sendFile(__dirname+"/" + 'add.html');
});
app.post('/',(req,res)=>{
	const schema={
	Book_ID: Joi.number().max(5).required(),
	Book_Name: Joi.string().min(3).required(),
	Author_Name: Joi.string().min(3).required()
	}
const course={
	 Book_ID: req.body.Book_ID,
	 Book_Name: req.body.Book_Name,
	 Author_Name: req.body.Author_Name
};
const result=Joi.validate(course, schema);
if(result.error){
	res.status(400).send(result.error.details[0].message);
	return;
}
m=req.body.Book_ID;
n=req.body.Book_Name;
o=req.body.Author_Name;
MongoClient.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db) {  
if (err) throw err;  
var dbo=db.db("Library");
var query = { "Book ID": m, "Book Name": n, "Author Name": o };  
dbo.collection("Books").insertOne(query, function(err, result) {  
if (err) throw err;  
res.send(result);
console.log("Data Inserted! "+result); 
db.close(); 
})
});
});
app.listen(4000,()=>{}) 

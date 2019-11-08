
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
	res.sendFile(__dirname+"/" + 'all.html');
});
app.post('/',(req,res)=>{
	const schema={
	}
const course={
};
const result=Joi.validate(course, schema);
if(result.error){
	res.status(400).send(result.error.details[0].message);
	return;
}
MongoClient.connect(url, {useNewUrlParser:true,useUnifiedTopology:true},function(err, db) {  
if (err) throw err;  
var dbo=db.db("Library");  
dbo.collection("Books").find({}).toArray(function(err, result) {  
if (err) throw err;  
res.send(result);
console.log("Data Shown on Webpage "); 
db.close(); 
})
});
});
app.listen(4000,()=>{}) 

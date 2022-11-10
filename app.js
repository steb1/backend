const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose')
const Articles = require ('./models/Articles');
const Costumes = require('./models/Costumes');
const Qiba = require('./models/Qiba');
const multer = require('./routes/ImageRoute');

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


mongoose.connect("mongodb+srv://Louis:seba1997@cluster0.hrdmn.mongodb.net/Articles?retryWrites=true&w=majority")
.then( () => console.log("connected to DB."))
.catch( err => console.log(err));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/NewArticle',(req,res) => {
    const { ArticleName ,Prix , image } = req.body;
    const newArticles = new Articles({ ArticleName,Prix, image});
     newArticles
      .save()
      .then(() => {
        console.log("Articles Saved Successfully!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  });

app.get('https://localhost:3001/getData', (req,res) => {
  const AllArticles = Articles.find()
  res.send(AllArticles)
})

app.get('/NewArticle',(req,res)=> {
  res.render('forms')
})

app.get('/NewCostume',(req,res)=> {
  res.render('formsQiba')
})

app.post('/NewCostume', (req,res) => {
  const { ArticleName ,Prix , image } = req.body;
  const newCostumes = new Costumes({ ArticleName,Prix, image});
  newCostumes
    .save()
    .then(() => {
      console.log("Costume Saved Successfully!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

app.get('/getData', (req,res) => {
Articles.find()
.then(Articles => res.status(200).json(Articles))
.catch(error => res.status(400).json({error}));
})
app.get('/getDataCostume', (req,res) => {
  Costumes.find()
  .then(Costumes => res.status(200).json(Costumes))
  .catch(error => res.status(400).json({error}));
  })

app.get('/',(req,res) => {
  res.render('index')
})

/*app.use(require('./routes/AjoutPanier'))
app.use(require('./routes/VoirProduit'))
app.use(require('./routes/supprimer'))*/

app.listen(3001, () => console.log('Listenning port : 3001'))
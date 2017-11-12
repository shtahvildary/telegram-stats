var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/TelegramStats');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error!'));
db.once('open',function(){
  console.log("DB is connected...LET'S GO!");
});

module.exports=db;
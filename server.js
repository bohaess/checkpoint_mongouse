const express=require("express") ;
const app=express() ;
const port=5000 ;
const mongoose=require("mongoose") ;

//database connection 
mongoose.connect("mongodb+srv://Oubeidallah:123*456*@cluster0.zzzt2.mongodb.net/checkpoint-mongoose?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  (err)=>{
      if(err) throw err ;
      console.log("Connected to database !")
  })
//middleware for express jason 
app.use(express.json()) ;
//routes for the server 
app.use('/',require('./routes/routes.js')) ;
app.listen(port,(err)=>{
    if(err) throw err ;
    console.log(`Server is running on ${port} !`)
})

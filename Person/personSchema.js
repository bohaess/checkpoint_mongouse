const mongoose=require('mongoose') ;
const personSchema=new mongoose.Schema({
    name:{
        type:String ,
        required:true
    },
    age:Number ,
    favoriteFoods:{
        type:[String] ,
        default:["no favorite foods"]
    }
})

module.exports=new mongoose.model("Person",personSchema) ;
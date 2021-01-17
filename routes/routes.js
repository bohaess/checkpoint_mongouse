const express=require("express") ;
const mongoose=require("mongoose") ;
const router=express.Router() ;
const person=require('../Person/personSchema')

//Create and Save a Record of a Model:
router
.route('/newUser')
.post((req,res)=>{
    const newUser=new person(req.body) ;
   newUser.save( )
    .then(doc=>{
        res.send(doc) 
    })
    .catch(err=>{
        if(err) throw err ;
    })
})

//Create Many Records with model.create()
router
.route('/newUsers')
.post((req,res)=>{
    const arrayOfPeople=req.body ;
  person.create(arrayOfPeople,(err)=>{
      if(err) {
          console.log(err)
      }
      else {
         res.send('List added successfully !')
      }
  })
})

//Use model.find() to Search Your Database
router
.route('/:name')
.get((req,res)=>{
    person.find({name:req.params.name}) 
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>{
        console.log(err)
    })
})

//Use model.findOne() to Return a Single Matching Document from Your Database
router
.route('/names/:name')
.get((req,res)=>{
    person.findOne({name:req.params.name}) 
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>{
        console.log(err)
    })
})

//Use model.findById() to Search Your Database By _id
router
.route('/persons/:id')
.get((req,res)=>{
    person.findById({_id:req.params.id}) 
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>{
        console.log(err)
    })
})

//Perform Classic Updates by Running Find, Edit, then Save
router
.route('/prs/:id')
.put((req,res)=>{
    const personId=req.params.id;
    const food=req.body.newFood;
    console.log(food)
    person.findById(personId,(err,doc)=>{
        if (err) console.log(err)
        else{
            var favoriteFoods=doc.favoriteFoods;
            favoriteFoods.push(food);
            doc.favoriteFoods=favoriteFoods;
            doc.save((err,doc)=>{
                if (err) console.log(err)
                else{
                    res.send(doc);
                }
            })
        }
    })
})

//route to update age of one person 

router
.route('/update/:name')
.put((req,res)=>{
    const namePerson=req.params.name ;
    Person.findOneAndUpdate({name:namePerson},{$set:{age:20}},{ new: true })
       .then(doc=>{
           res.send(doc)
       })
       .catch(err=>{
           console.log(err)
       })
    
})

//route to delete all name match to given name 
router
.route('/deleteAll/:name')
.delete((req,res)=>{
const namePerson=req.params.name;
Person.remove({name:namePerson},(err,doc)=>{
if (err){
    console.log(err);
}
else{
    res.send(`Tout les personnes nommé ${namePerson} sont supprimé`);
}
})
})

//route to do narrow search 
router
.route('querySearch/:food')
.get((req,res)=>{
    const foodName=req.params.food ;
    person.find({favoriteFoods:foodName},{age:0}).sort({name:1}).limit(2).exec((err,doc)=>{
        if (err){
            console.log(err)
        }else{
            res.json(doc);
        }
        }
    )
    })






module.exports=router ;
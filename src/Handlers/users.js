
require('dotenv').config();
let jwt = require('jsonwebtoken');



const register = async (req, res) => {
    const db = req.db.db('test');
   const  userName = req.body.userName;
   const  email = req.body.email;
   const password = req.body.password



    try {
       await db
          .collection("User")
          .insertOne({
            userName,
            email,
            password
          }
          );
        res.status(201).json({
          status: 201,
          data: userName
        });
    
      } catch (err) {
        res.status(500).json({
        
          message: "Something went wrong",
          err: err,
        });
        console.log(err);
      }

}

const login = async (req, res) =>{
    const db = req.db.db('test');
    user = req.body
    const  email = req.body.email;
    const password = req.body.password
    const secretEmail = process.env.email ;
    const secretPassword = process.env.password ;
   const privateKey = process.env.secretKey.replace(/\\n/gm, '\n') ;
    const condition = (email === secretEmail && password === secretPassword);

    console.log('private kei', privateKey)
    console.log('email', email)
    console.log('password ', password )
    //replace(/\\n/gm, '\n')

   /*await jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
     console.log('err', err)
      console.log('token ',token);
    });*/

 
if(condition){
    try {
      const findUser =  await db
        .collection("User")
        .findOne({ email: email, password:password})



      if(findUser){
        const token = jwt.sign(
          { foo: 'bar'},
          privateKey,
          {
            expiresIn: "2h",
          }
        );
      res.status(201).json({
        status: 201,
        data: token
      })}
       
      else {
        res.status(500).json({
            status: 500,
    
          })}
     
       } catch (err) {
         res.status(500).json({
           message: "Something went wrong",
           err: err,
         });
         console.log(err);
       } 
      } else{
        res.status(500).json({
          message:"You shall not pass"
        })
      }
}


module.exports = {
    register,
    login
}
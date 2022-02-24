
require('dotenv').config();

const register = async (req, res) => {
    const db = req.db.db('test');
   const  userName = req.body.userName;
   const  email = req.body.email;

    console.log('sdsd',req.body)
    try {
       await db
          .collection("User")
          .insertOne({
            userName,
            email,
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
    const  userName = req.body.userName;
    const  email = req.body.email;
    const password = req.body.password
    const secretUserName = process.env.userName ;
    const secretEmail = process.env.email ;
    const secretPassword = process.env.password ;
    const condition = (userName === secretUserName && email === secretEmail && password === secretPassword);
 

    try {

      const findUser =  await db
        .collection("User")
        .findOne({ userName: userName })

        console.log('FIND USER', findUser)


      if(findUser){
      res.status(201).json({
        status: 201,
        data: email
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
}


module.exports = {
    register,
    login
}
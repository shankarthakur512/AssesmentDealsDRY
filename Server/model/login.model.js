import mongoose  from "mongoose";


const LoginSchema = new mongoose.Schema({
   f_sno :{
    type  : Number,
    required : true,

   },
   
    Username : {
        type : String,
        required :true,
        unique :true
    },
    password : {
        type : String,
        required : true,
        
    }

})


export const Login = mongoose.model("Login" , LoginSchema)



// const newLogin = new Login({
    
//     f_sno: 1,  // Ensure this is a valid number
//     Username: "shankar",
//     password: "1234"
//   });
  
//   newLogin.save()
//     .then(() => console.log('Document inserted successfully'))
//     .catch(err => console.error('Error inserting document:', err));
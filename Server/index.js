
import express, { urlencoded } from "express"
import ConnectDB from "./database.js";
import { Login } from "./model/login.model.js";
import cors from "cors"

import { Employee } from "./model/Employee.model.js";
import { upload } from "./Middleware/multer.js";
const app = express();
//middleware
app.use(cors({
    origin : '*'
}))
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({extended: true, limit: '10mb'}))
app.use("/uploads/temp", express.static("uploads/temp"));










// routes and controllers for login

app.post('/login' , async (req, res) => {
    const { Username, password } = req.body;
  
    
    if (!Username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      // Find user
      const user = await Login.findOne({Username , password});
  
      if (user) {
        // If valid, respond with a  user data
        res.status(200).json({ message: 'Login successful', user });
      } else {
        // Invalid login
        res.status(401).json({ message: 'Invalid login details' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  })


//route and controller for employe create
app.post('/create-employee' ,upload.single('Image'), async (req , res)=>{
    try {
        
        const { Name, Email, Mobile, Designation, gender, Course, Createdate } = req.body;
    
        // Check if all fields are not present
        if (!Name || !Email || !Mobile || !Designation || !gender || !Course || !Createdate) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
       
        if (!req.file) {
          return res.status(400).json({ message: 'Image file is required' });
        }
    
        console.log(req.file.path)


        const newEmployee = new Employee({
         Name,
          Email,
           Mobile,
           Designation,
           gender,
           Course,
          Image : req.file.path  
        });
     await newEmployee.save();
     res.status(200).json({ message: 'Employee created successfully', employee: newEmployee });
      } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Server error' });
      }

})


app.get('/employee-list', async (req, res) => {
    try {
     
      const employeeList = await Employee.find({});
  
     
      return res.status(200).json({ employeeList });
    } catch (error) {
      
      console.error('Error fetching employee list:', error);
      return res.status(500).json({ message: 'Server error while fetching employee list' });
    }
  });
  
app.post('/update-employee' , upload.single("Image") , async (req , res)=>{
  try {
    const {id, Name, Email, Mobile, Designation, gender, Course } = req.body;
 
 
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

   
    employee.Name = Name || employee.Name;
    employee.Email = Email || employee.Email;
    employee.Mobile = Mobile || employee.Mobile;
    employee.Designation = Designation || employee.Designation;
    employee.gender = gender || employee.gender;
    employee.Course = Course || employee.Course;
    employee.Image = req.file.path || employee.Image
   
    if (req.file) {
      employee.Image = req.file.filename; 
    }


    const updatedEmployee = await employee.save();

    res.status(200).json({
      message: 'Employee updated successfully',
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }



})




ConnectDB().then(()=>{console.log("mongoDB connected SUccessfully")});
app.listen(4000 , ()=>{console.log("server started")})
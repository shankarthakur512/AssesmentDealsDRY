import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    
    Image: { type: String },  
    Name: { type: String, required: true },
    Email: { type: String, required: true , unique : true},
    Mobile: { type: String, required: true },
    Designation: { type: String, required: true },
    gender: { type: String, required: true },
    Course: { type: String, required: true },
    Createdate: { type: Date, default: Date.now }
})


export const Employee = mongoose.model('Employee' , EmployeeSchema)
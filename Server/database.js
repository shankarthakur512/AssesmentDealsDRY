import mongoose from "mongoose";

async function ConnectDB (){
    
const DB_URL = 'mongodb+srv://skt48324:Shankar%40123@cluster0.exs8a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
await mongoose.connect(DB_URL)
}

export default ConnectDB
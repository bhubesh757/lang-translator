import mongoose from "mongoose"

const connectionString = "mongodb+srv://bhubesh:password321@translatorlang.qodoybz.mongodb.net/?retryWrites=true&w=majority&appName=translatorlang";

if(!connectionString) {
    throw new Error("Please check the connection")
}


// connecting mongo to frontend and backend
const connectDb = async() => {
    if(mongoose.connection.readyState >= 1) {
        console.log("Already Connected to Mongodb");
        return;
    }

    try {
        await mongoose.connect(connectionString);
        console.log("connected to mongodb ");
    }
    catch(err) {
        console.error("Cannot connect to mongodb " , err);
        
    }
}
export default connectDb;
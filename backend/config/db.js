import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://maitrimydur:sHsWjWdzhRAUrrtr@cluster0.sylbqtq.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}
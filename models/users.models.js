import mongoose, { Schema } from "mongoose";
import {COLLECTIONS } from  "../utils/collections.js";


const userSchema = new mongoose.Schema({
    userName:{
        type:String , 
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type : String,
        require : true ,     
    }

})

const UserModel = new mongoose.model(COLLECTIONS.USERS, userSchema)

export const getUser = (data) => {
    return UserModel.find(data)
}
export const getOneUser = (data) => {
    console.log(data)
    return UserModel.findOne(data)
}

export const createUser = (data) => {
    return UserModel.create(data)
}

export const getUserById = (id) => {
    return UserModel.findById(id)
}

export default UserModel
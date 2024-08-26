import UserModel , {getUser , createUser } from "../models/users.models.js" 
import bcrypt, { compareSync } from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import { createSession } from "../models/sessions.models.js";

const randomString =  uuidv4() ; 

export const register =  async (req , res ) => {
    
    const {userName , email , password } = req.body 
    try {
        const checkUser = await getUser({userName})
        console.log(checkUser)

        if (checkUser.length ) {
            throw new Error('username is exist')
        }

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt)


        const newUser = {userName , email , password : hashPassword }
        const createNewUser = await createUser(newUser)

        res.status(200).send({
            user: createNewUser,
            message : "Seccess"
        })
    }
    catch(error){
        res.status(500).send({
        message: error.message,
        })
    }  
}

export const  login = async (req, res) => { 
    const { email , password } = req.body 
    try{
        const findUser = await UserModel.findOne({ email });
        if (!findUser) {
          throw new Error("Email is incorrect");
        }

        const checkPassword =  bcrypt.compareSync(password , findUser.password )
       
        if(!checkPassword) {
            throw new Error("Password is incorrect! ") ; 
        }

       
        const apiKey = `mern-${findUser.userName}-${findUser.password}-${randomString}`
        await createSession({apiKey})     
        res.status(200).send({
        message: 'ok ' , 
        apiKey,
        }) 
    }

    catch(error){
        res.status(500).send({
        message: error.message,
        })
    }
}




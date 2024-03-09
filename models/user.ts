import { Schema, model, models } from "mongoose";

interface UserType {
    username: string;
    password: string;
    fName: string;
    lName: string;
    isAdmin: boolean;
}

const userSchema = new Schema<UserType>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})

const User = models.User || model('User', userSchema) 
export default User
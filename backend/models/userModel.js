import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

// since we add metthod to the schema no we can access this method on any user object (user.matchPassword())
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


// Middleware to hash the password before saving the user
// .pre() is a middleware function that runs before a specific event
// In this case, we want to hash the password before saving the user

userSchema.pre('save', async function(next) {
    
    // if the password is not modified we don't want to hash it again
    if (!this.isModified('password')) {
        next()
    }

    
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt)
    
})

// once those user is registered we i wanna authticate the user besically
// we iwanna create  json web token and we iwanna create our http only cookie
// but lets create a separate file for that in the utils folder called generateToken.js 

const User = mongoose.model('User', userSchema)

export default User
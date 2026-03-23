const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating a auser"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"INvalid email Address"],
        unique:[true,"Email already exists"]
    },

    name:{
        type:String,
        required:[true,"Name is required for creating an account"],
    },

    password:{
        type:String,
        required:[true,"Password is required for creating an account"],
        minLength:[6,"Password should contan more than 6 characters"],
        select:false //taaki query se user search krte time pswd count na ho
    }
},{
    timestamps:true
})

userSchema.pre("save",async function(next){ //pre hash mei convert krke db mei save krdega

    if(!this.isModified("password")){
        return; 
    }

    const hash = await bcrypt.hash(this.password,10)
    this.password = hash

    return;
})

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password , this.password);
}

const userModel = mongoose.model("user",userSchema);

module.exports = userModel
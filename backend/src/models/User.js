import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username:{type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        },
       password:{
    type:String,
    required:true,
},
},
{
    timestamps:true,
});

// save hone se pahle
userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
     
    // gen salt 
    const salt = await bcrypt.genSalt(10);

    //psw + salt
    console.log(this.password);
    this.password = await bcrypt.hash(this.password,salt);
    console.log(this.password);
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword,this.password);
}

export default mongoose.model("User",userSchema);

const mongoose=require("mongoose");
let Schema=mongoose.Schema;
let userSchema=new Schema({
    username:{
        type:String,
        unique:true
        },
    password:{
        type: String
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model("User",userSchema);
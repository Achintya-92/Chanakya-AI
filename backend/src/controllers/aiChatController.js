import Chat from "../models/Chat.js";
import ChatService from "../services/ChatService.js";
import Goal from "../models/Goal.js";

export const  createChat=async (req,res)=>{
   
 if(req.body.id){
 const goal=await Goal.findById(req.body.id);
 await ChatService({
    userId:(goal.userId).toString(),
    goalId:req.params.id,
    title:goal.title,
    goalType:goal.goalType,
    description:goal.description,
    age:goal.age,
    currentState:goal.currentState,
    availableTime:goal.availableTime,
    chat:req.body.chat,
    pageContent:req.body.data,
 })
}else{
  await ChatService({
    userId:req.body.userId,
    chat:req.body.chat
 }) 
}

}
export const  getChats=async(req,res)=>{
try{

const chats=await Chat.find({
   userId:req.user._id
});


if(!chats){
 return  res.status(404).send({
   success:false,
   message:"Chats Not Found!"
});
}
 return res.status(201).send({
   success:true,
   chats:chats
})

if(chats.length>0 && chats[0].userId.toString()!==req.user._id){
   res.status(403).send({
   success:false,
   message:"Access denied!"
})
}
}catch(error){
 return res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
}
}

export const  getChat=async(req,res)=>{
try{
const chat=await Chat.findById(req.params.Id);

if(!chat){
   res.status(404).send({
   success:false,
   message:"Chat Not Found!"
});
}

if(chat.length>0 && chat[0].userId.toString()!==req.params.userId){
   res.status(403).send({
   success:false,
   message:"Access denied!"
})
}

res.status(201).send({
   success:true,
   chat:chat
})

}catch(error){
console.log(error);
 return res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
}
}

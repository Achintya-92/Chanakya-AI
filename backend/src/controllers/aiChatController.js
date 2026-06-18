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

   if(req.params.userId){
const chats=await Chat.find({
   userId:req.params.userId
});
}

if(!chats){
   res.status(400).send({
   success:false,
   message:"Chats Not Found!"
});
}
res.status(201).send({
   success:true,
   chats:chats
})

if(chats && chats[0].userId.toString()!==req.params.userId){
   res.status().send({
   success:false,
   message:"Access denied!"
})
}

}catch(error){
console.log(error);
}
}

export const  getChat=async(req,res)=>{
try{
const chat=await Chat.findById(req.params.Id);
if(!chat){
   res.status(400).send({
   success:false,
   message:"Chat Not Found!"
});
}
res.status(201).send({
   success:true,
   chat:chat
})

}catch(error){
console.log(error);
res.send({success:false,message:error});
}
}

import Goal from "../models/Goal.js";
import Todo from "../models/Todo.js";
import Roadmap from "../models/Roadmap.js";
import System from "../models/System.js";
import AIContent from "../models/AIContent.js";
import generateGoalHash from "../utils/GenerateGoalHash.js";
import RoadmapGenerator from "../services/roadmapGenerator.js";
import TodoGenerator from "../services/todoGenerator.js";
import systemGenerator from "../services/systemGenerator.js";
import SystemGenerator from "../services/systemGenerator.js";


export const createGoal = async (req, res) => {
  try {
    const {
      title,
      goalType,
      age,
      description,
      currentState,
      availableTime,
    } = req.body;
    const goalHash = generateGoalHash({
      title,
      goalType,
      description,
      age,
      currentState,
      availableTime,
    });

    // Cache Check
    const existingAIContent =
      await AIContent.findOne({ goalHash });

    const userId = (req.user._id).toString();
    // Save Goal
    const goal = await Goal.create({
      userId,
      title,
      goalType,
      description,
      age,
      currentState,
      availableTime,
      goalHash,
    });

    const goalId = (goal._id).toString();
    // -------------------------
    // CACHE EXISTS
    // -------------------------
    if (existingAIContent) {

      await Todo.create({
        userId,
        goalId,
        todo: existingAIContent.todo,
      });

      await Roadmap.create({
        userId,
        goalId,
        roadmap: existingAIContent.roadmap,
      });

      await System.create({
        userId,
        goalId,
        system: existingAIContent.system,
      });

      return res.status(200).json({
        success: true,
        cached: true,
        message: "Goal loaded from cache 👍",
        goal,
      });
    }

    return res.status(201).json({
      success: true,
      cached: false,
      message: "Goal created successfully 👍",
      goal,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Goals of Logged-in User
export const getGoalByUserId = async (req, res) => {
  try {

    const goals = await Goal.find({
      userId: req.user._id,
    });

if (!goals) {
  return res.status(404).json({
    success: false,
    message: "Create a goal first.",
  });
}


if (goals[0].userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
        success:false,
        message:"Access denied"
    });
}

    return res.status(200).json({
      success: true,
      goals: goals, // [] if empty
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });

  }
};

export const getTodoById = async (
  req,
  res
) => {
  try {
    const goal = await Goal.findById(req.params.id);

if (!goal) {
  return res.status(404).json({
    success: false,
    message: "Create a goal first.",
  });
}

if (goal.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
        success:false,
        message:"Access denied"
    });
}

     const todos =
      await Todo.find(
         {
          goalId:req.params.id,
        }
      );
  
      if (todos.length > 0) 
    { return res.status(200).json({
      success: true,
       todos:todos
    });
  }
  else{
  await TodoGenerator({
     userId:(goal.userId).toString(),
       goalId:req.params.id,
        title:goal.title,
        goalType:goal.goalType,
        description:goal.description,
        age:goal.age,
        currentState:goal.currentState,
        availableTime:goal.availableTime
      })

 const todo =await Todo.find({
      goalId:req.params.id,
       })
    // Ownership Check 
    if (todo.length>0) {
    return  res.status(200).json({
      success: true,
       todos:todo
    });
  }
  }
}catch (error) {
    console.log(error);
  return res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

export const getRoadmapById = async (
  req,
  res
) => {

  try {
     const goal =
      await Goal.findById(
        req.params.id
      );

    if(goal.length==0){
      console.log(req.params.id);
      res.send({success: false,message:"Create a goal first."});
    };

    if (goal.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
        success:false,
        message:"Access denied"
    });
}
   const roadmap = await Roadmap.find(
         {goalId:req.params.id}
      );
      if(roadmap.length>0){
  return  res.status(200).json({
      success: true,
      roadmap,
    });
  }
  else{
   await RoadmapGenerator({
        userId:(goal.userId).toString(),
       goalId:req.params.id,
        title:goal.title,
        goalType:goal.goalType,
        description:goal.description,
        age:goal.age,
        currentState:goal.currentState,
        availableTime:goal.availableTime
      })
        

     const roadmap = await Roadmap.find(
         {goalId:req.params.id}
      );

  return  res.status(200).json({
      success: true,
      roadmap,
    });
  }
  } catch (error) {
     console.log(error);
   return res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

export const getSystemById = async (
  req,
  res
) => {
  try {
    const goal = await Goal.findById(req.params.id);

if (!goal) {
  return res.status(404).json({
    success: false,
    message: "Create a goal first.",
  });
}

if (goal.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
        success:false,
        message:"Access denied"
    });
}

  const system = await System.find(
       {goalId:req.params.id}
      );
      if(system.length>0){
    res.status(200).json({
      success: true,
      system,
    });
}else{  
     await SystemGenerator({
       userId:(goal.userId).toString(),
       goalId:req.params.id,
        title:goal.title,
        goalType:goal.goalType,
        description:goal.description,
        age:goal.age,
        currentState:goal.currentState,
        availableTime:goal.availableTime
      });

 const newSystem = await System.find({
    goalId: req.params.id,
  });

  return res.status(200).json({
    success: true,
    system: newSystem,
  });
}
  } catch (error) {
    console.log(error);
   return res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

//goal byId
export const getGoalById = async (
  req,
  res
) => {
  try {
    
   const goal =
      await Goal.findById(
        req.params.id
      );
      
    if (!goal) {
      return res.status(404).json({
        success: false,
        message:
          "Goal not found",
      });
    }

    if (goal.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
        success:false,
        message:"Access denied"
    });
}

    const aiContent =
      await AIContent.findOne({
        goalHash:goal.goalHash,
      });

    res.status(200).json({
      success: true,
      goal,
      aiContent,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};

// Delete Goal
export const deleteGoal = async (
  req,
  res
) => {
  try {
    const goal =
      await Goal.findById(
        req.params.id
      );

    if (!(goal.length>0)) {
      return res.status(404).json({
        success: false,
        message:
          "Goal not found",
      });
    }

    // Ownership Check
    if (
      goal[0].userId.toString()!==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied",
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Goal deleted successfully 👍",
    });

  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Something Went wrong",
    });
  }
};
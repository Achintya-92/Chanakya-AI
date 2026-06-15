import Goal from "../models/Goal.js";
import Todo from "../models/Todo.js";
import Roadmap from "../models/Roadmap.js";
import System from "../models/System.js";
import AIContent from "../models/AIContent.js";
import generateGoalHash from "../utils/GenerateGoalHash.js";
import RoadmapGenerator from "../services/roadmapGenerator.js";
import TodoGenerator from "../services/todoGenerator.js";
import systemGenerator from "../services/systemGenerator.js";


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
export const getGoals = async (
  req,
  res
) => {
  console.log(req.header);
  try {
    const goals = await Goal.find({

    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: goals.length,
      goals,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Goal
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

    // Ownership Check 
    if (
      goal.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied",
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTodoById = async (
  req,
  res
) => {
  try {
    const todos =
      await Todo.find(
         {
          goalId:req.params.id,
        }
      );

    if (!todos) {
      return res.status(404).json({
        success: false,
        message:
          "Todo not found",
      });
    }
    // Ownership Check 
    if (
      todos[0].userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied",
      });
    }
    //  console.log(todos[0].todo);
    res.status(200).json({
      success: true,
      todos
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoadmapById = async (
  req,
  res
) => {

  try {
    const roadmap =
      await Roadmap.find(
         {goalId:req.params.id}
      );

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message:
          "Roadmap not found",
      });
    }

    // Ownership Check

    if (
      roadmap[0].userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      roadmap,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSystemById = async (
  req,
  res
) => {
  try {
    const system =
      await System.find(
       {goalId:req.params.id}
      );

    if (!system) {
      return res.status(404).json({
        success: false,
        message:
          "System not found",
      });
    }

    // Ownership Check

    if (
      system[0].userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied",
      });
    }
    //  console.log(system[0].system);

    res.status(200).json({
      success: true,
      system,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

    if (!goal) {
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
import ActionGenerator from "../services/ActionGenerator.js";
import System from "../models/System.js";
import Action from "../models/Action.js";
import Todo from "../models/Todo.js";
import Goal from "../models/Goal.js";

//how to get most recently added collection from mongodb

export const CreateAction = async (req, res) => {
    const today = new Date().toISOString().split("T")[0];

    try {
        const goal = await Goal.findById(req.body.goalId);

        const action = await Action.findOne({
            userId: req.user._id,
            goalId: req.body.goalId,
            date: today
        });

        if (action) {
            return res.status(201).json({
                success: true,
                action
            });
        }

        const system = await System.findOne({
            goalId: req.body.goalId
        });

        const todo = await Todo.findOne({
            goalId: req.body.goalId
        });

        if (!system || !todo) {
            return res.status(404).json({
                success:false,
                message:"System or Todo not found"
            });
        }

        const previousActions = await Action.find({
            userId:req.user._id,
            goalId:req.body.goalId
        })
        .sort({createdAt:-1})
        .limit(7);

        await ActionGenerator({
            userId:req.user._id,
            goalId:req.body.goalId,
            date:today,
            deadline:goal.availableTime,
            system,
            todo,
            previousActions,
            isFirstDay: previousActions.length === 0
        });

    const todayAction = await Action.findOne({
    userId:req.user._id,
    goalId:req.body.goalId,
    date:today
});

return res.status(201).json({
    success:true,
    action:todayAction
});
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const updateAction = async (req, res) => {

    try {

        const updated = await Action.findOneAndUpdate(
            {
                goalId: req.body.goalId,
                userId: req.user._id,
                date: new Date().toISOString().split("T")[0]
            },
            {
                action: req.body.action,
                status: req.body.action.overallStatus
            },
            {
                new: true
            }
        );

        return res.json({
            success: true,
            action: updated
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

export const CreateNextAction = async (req, res) => {
try{
 const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    const date = tomorrow.toISOString().split("T")[0];

    // already generated?
    const goal = await Goal.findById(req.body.goalId);

    const already = await Action.findOne({
        userId:req.user._id,
        goalId:req.body.goalId,
        date
    });
    
    const system = await System.findOne({
    goalId: req.body.goalId
});

const todo = await Todo.findOne({
    goalId: req.body.goalId
});

if(!system || !todo){

return res.status(404).json({

success:false,

message:"System or Todo not found"

});

}
    if(already){
        return res.json({
            success:true,
            action:already
        });

    }

    // previous 7 days

    const previousActions = await Action.find({
        userId:req.user._id,
        goalId:req.body.goalId
    })
    .sort({createdAt:-1})
    .limit(7);

    await ActionGenerator({

        userId:req.user._id,

        goalId:req.body.goalId,

        date,

        deadline:goal.availableTime,

        system,

        todo,

        previousActions,

        isFirstDay:false

    });

    const nextAction = await Action.findOne({
        userId:req.user._id,
        goalId:req.body.goalId,
        date
    });

    res.json({
        success:true,
        action:nextAction
    });

}catch(err){

return res.status(500).json({
success:false,
message:err.message
})

}
   

}
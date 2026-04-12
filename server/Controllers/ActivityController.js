import Activity from "../Models/ActivityModel.js";

export const createActivity = async (req, res) => {
    try {
        const { message } = req.body;
        const userID = req.user._id;
        const newActivity = new Activity({
            message,
            userID
        })
        await newActivity.save();
        console.log(req.user);
        res.status(200).json(newActivity);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getActivityByID = async (req, res) => {
    try {
        const userID = req.user._id;
        const activityData = await Activity.find({ userID });
        if(!activityData){
            return res.status(404).json({message: "Activity not found"});
        }
        res.status(200).json(activityData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


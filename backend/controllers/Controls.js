const Users = require('../modals/connections');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { userDetails } = req.body;
        const hashedPassword = await bcrypt.hash(userDetails.password, 10);
        const newUser = new Users.userDetails1({
            username: userDetails.userName,
            email: userDetails.userEmail,
            password: hashedPassword,
        });
        const result = await newUser.save();
        res.status(200).send({ msg: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: false });
    }
}

const isUserValid = async (req, res) => {
    try {
        const { userDetails } = req.body;
        const result = await Users.userDetails1.find({ email: userDetails.userEmail });
        let length = result.length;
        if (length != 0) {
            const hashedPassword = await bcrypt.compare(userDetails.password, result[0].password);

            if (hashedPassword) {
                res.status(201).send({ msg: true, email: result[0].email });
            } else {
                res.status(201).send({ msg: false });
            }
        } else {
            res.status(201).send({ msg: false });
        }
    } catch (error) {
        console.log(error);
        res.status(201).send({ msg: false });
    }
}

const addTask = async (req, response) => {
    try {
        const { workDetails, emailId } = req.body;
        const res = await Users.userDetails1.find({ email: emailId });
        const id = res[0]._id.toString();
        const isAlreadyPresent = await Users.userTaskDetails.find({ user_id: id });
        if (isAlreadyPresent.length == 0) {
            const newWork = new Users.userTaskDetails({
                workTasks:workDetails,
                user_id: id,
            });
            
            const result = await newWork.save();
            console.log(result);
            response.status(201).send({ msg: true });
        } else {
            const todo = await Users.userTaskDetails.updateOne({ user_id: id }, {
                $push: {
                    workTasks: workDetails,
                }
            });
            response.status(201).send({ msg: true });
        }
    } catch (error) {
        console.log(error);
        response.status(201).send({ msg: false });
    }
}

const getTasks = async (req, response) => {
    try {
        const { email } = req.body;
        const result = await Users.userDetails1.find({ email: email });
        const id = result[0]._id.toString();
        const todoList = await Users.userTaskDetails.find({ user_id: id });
        if (todoList.length == 0) {
            response.status(201).send({ msg: false });
        } else {
            
            response.status(201).json({ msg: true, todo: todoList[0].workTasks });
        }
    } catch (error) {
        console.log(error);
    }
}
const deleteTask = async (req, response) => {
    try {
        const { email, todo_task } = req.body;
        const result = await Users.userDetails1.find({ email: email });
        let id = result[0]._id;
        id.toString();
        const todoList = await Users.userTaskDetails.find({ user_id: id });
        if (todoList.length == 0) {
            response.status(201).send({ msg: false });
        } else {
            const todo = await Users.userTaskDetails.findOneAndUpdate({ user_id: id }, {
                $pull: {
                    workTasks: todo_task,
                }
            });
            response.status(201).send({ msg: true });
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    registerUser,
    isUserValid,
    addTask,
    getTasks,
    deleteTask,
}
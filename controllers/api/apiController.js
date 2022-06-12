import { getConnection } from 'typeorm';
import jwt from "jsonwebtoken"


export const deleteTask = async(req, res) => {
    const taskRepository = await getConnection().getRepository('Task');
    taskRepository.delete(req.body.id);
    
    return res.redirect('/home');
}

export const completeTask = async(req, res) => {
    const taskRepository = await getConnection().getRepository('Task');
    const userRepository = await getConnection().getRepository('User');
    const decToken = await jwt.decode(req.cookies.token);

    const user = await userRepository.findOne({
        where: {
            id : decToken.id
        }
    });

    const task = await taskRepository.findOne({
        where: {
            id: req.body.id,
            users: user
        }
    });


    const taskmove = await taskRepository.save({
        ...task,
        ...{
            status: "done"
        },
    });

    return res.redirect('/home');
}

export const todoPost = async (req, res) => {
    const userRepository = await getConnection().getRepository('User');
    const taskRepository = await getConnection().getRepository('Task');
    const decoded_token = await jwt.decode(req.cookies.token);

    const user = await userRepository.findOne({
        where: {
            id : decoded_token.id
        }
    });

    const sameTask = await taskRepository.findOne({
        where: {
            task: req.body.task,
            users: user,
            category: "Default"
        }
    });


    if(sameTask !== undefined){
        return res.status(400).json({err: "Task already exists"});
    }


    req.body.status = "to-do";

    const task = await  taskRepository.save({
        ...req.body,
        users: user
    });

    return res.redirect('/home');
}

import { getConnection } from 'typeorm';
import jwt from "jsonwebtoken"

export const home = async (req, res) => {

    const decToken = await jwt.decode(req.cookies.token);

    const userRepository = await getConnection().getRepository('User');
    const categoryRepository = await getConnection().getRepository('Category');
    const taskRepository = await getConnection().getRepository('Task');

    const user = await userRepository.findOne({
        id: decToken.id
    });

    const toDoTasks = await taskRepository.find({
        status: 'to-do',
        users: user
    });

    const doneTasks = await taskRepository.find({
        status: 'done',
        users: user
    });

    return res.render('home', {todoTasks: toDoTasks, doneTasks: doneTasks});
};
import { getConnection } from 'typeorm';
import jwt from "jsonwebtoken"
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt';

export const loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const userRepository = getConnection().getRepository('User');

    const validationErrs = validationResult(req);
    if(!validationErrs.isEmpty()){
        return res.status(400).json({ err: validationErrs.array() });
    }


    const user = await userRepository.findOne(
        { where: { email: email }
    });

    if(!user) {
        return res.status(400).json({"errors":[{"msg":"User does not exist"}]});
    } 
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.TOKEN_SALT);
        res.cookie('token', token, {
            HTTPOnly: true
        })
        return res.redirect('/home');
    }else{
        return res.status(400).json({"errors":[{"msg":"Password is wrong"}]});

    }

}

export const registerPost = async (req, res) => {
    const userRepository = await getConnection().getRepository('User');

    const foundUser = await userRepository.findOne(
        { where: { email: req.body.email } }
    );

    if(foundUser){
        return res.status(400).send(`This email already exists`);
    }else{
        const passwordHash = bcrypt.hashSync(req.body.password, 12);

        const savedUser = userRepository.save({
            email: req.body.email,
            password: passwordHash
        });
    }
    return res.redirect('/');
}

export const logoutGet = async (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
}
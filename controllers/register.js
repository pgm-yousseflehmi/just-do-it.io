import { getConnection } from 'typeorm';
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    return res.render('register');
}
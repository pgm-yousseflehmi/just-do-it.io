import { getConnection } from 'typeorm';
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    return res.render('login');
}
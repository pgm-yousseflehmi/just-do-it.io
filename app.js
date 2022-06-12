import express from "express";
import * as path from "path";
import "dotenv/config";
import { createConnection } from "typeorm"
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { create } from "express-handlebars";

/* Controllers */
import { home } from "./controllers/home.js"
import { login } from "./controllers/login.js"
import { register } from "./controllers/register.js"

import { loginPost, registerPost, logoutGet } from "./controllers/api/authController.js";
import { todoPost,completeTask,deleteTask } from "./controllers/api/apiController.js";

import loginVal from "./middleware/validation/loginAuthentication.js"

import User from "./entity/User.js"
import Task from "./entity/Task.js"
import Cat from "./entity/Cat.js"


const app = express();
app.use(express.static('public'))

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = create({
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs")
app.set("views", path.resolve('./src/views'))

app.get('/', login)
app.get('/register', register)
app.get('/home', home)
app.get('/logout', logoutGet)

app.post('/loginPost',...loginVal, loginPost)
app.post('/registerPost', registerPost)
app.post('/todoPost', todoPost)
app.post('/completeTask', completeTask)
app.post('/deleteTask', deleteTask)

createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  logging: true,
  entities: [User, Task, Cat],
  synchronize: true
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Application is running on http://localhost:${process.env.PORT}/.`);
  });
})
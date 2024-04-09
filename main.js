import express from "express";
import * as UserController  from './controllers/UserController.js'
import * as TodoController from './controllers/TodoController.js'
import mongoose from "mongoose";
import { TodoCreateValidation, registerValidation } from "./validations/auth.js";
import isAuth from './utils/checkAuth.js'
import cors from 'cors'

mongoose.connect(
    'mongodb+srv://vladbogdan39:435679@cluster1.byfkbgw.mongodb.net/LoginTest?retryWrites=true&w=majority&appName=Cluster1'
    ).then(() => console.log('DB'))
    .catch((err) => console.log('DBERROR',err))

const app = express();

app.use(express.json());
app.use(cors())

app.listen(4444, (err) => {
    if (err) {
        console.error(err);
    }

    console.log("OK")
})



app.post('/auth/register', registerValidation, UserController.register );

app.post('/auth/login', UserController.login )

app.get('/auth/me', isAuth, UserController.getMe)

app.post('/todos', isAuth, TodoCreateValidation, TodoController.create);

app.get('/todos',isAuth, TodoController.getAllTodos)

app.get('/todos/:id', TodoController.getOneTodo)

app.delete('/todos/:id', isAuth, TodoController.remove)

app.patch('/todos/:id', isAuth, TodoController.update)

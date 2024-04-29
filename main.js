import express from "express";
import * as UserController  from './controllers/UserController.js'
import * as TodoController from './controllers/TodoController.js'
import mongoose from "mongoose";
import { TodoCreateValidation, registerValidation } from "./validations/auth.js";
import isAuth from './utils/checkAuth.js'
import cors from 'cors'
import multer from "multer";
import fs from "fs";
import Todo from "./models/Todo.js";

mongoose.connect(
    'mongodb+srv://vladbogdan39:435679@cluster1.byfkbgw.mongodb.net/LoginTest?retryWrites=true&w=majority&appName=Cluster1'
    ).then(() => console.log('DB'))
    .catch((err) => console.log('DBERROR',err))

const app = express();

app.use(express.json());
app.use(cors())

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      }
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

app.listen(4444, (err) => {
    if (err) {
        console.error(err);
    }

    console.log("OK")
})

app.use('/uploads', express.static('uploads'));



app.post('/auth/register', registerValidation, UserController.register );

app.post('/auth/login', UserController.login )

app.get('/auth/me', isAuth, UserController.getMe)

app.patch('/auth/me/:id', isAuth, UserController.updateMe)

app.post('/todos', isAuth, TodoCreateValidation, TodoController.create);

app.get('/todos',isAuth, TodoController.getAllTodos)

app.get('/todos/:id', isAuth, TodoController.getOneTodo)

app.delete('/todos/:id', isAuth, TodoController.remove)

app.post('/todos/sortByName', isAuth, TodoController.sortByName)

app.post('/todos/sortDefault', isAuth, TodoController.sortDefault)

app.post('/todos/sortByDate', isAuth, TodoController.sortByDate)

app.post('/todos/sortByDateDefault', isAuth, TodoController.sortByDateDefault)

app.patch('/todos/:id', isAuth, TodoController.update)

app.post('/upload', isAuth, upload.single('image'), (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  });

import UserModel from '../models/User.js';
import bcrypt  from 'bcrypt';
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        passwordHash : hash,
        avatarUrl: req.body.avatarUrl,
    });

    console.log(doc)

    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id,
    }, 'secret4444',
    {
        expiresIn: '30d',
    },
    )

    const { passwordHash, ...userData } = user._doc;

    res.json({
        ...userData,
        token,
    })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: ' Не удалось зарегестрироваться ',
        })
    }
}

export const login = async (req, res) => {

    try{

    const user = await UserModel.findOne({ email: req.body.email });

    if(!user) {
        return res.status(400).json({
            message: "Неверный логин или пароль"
        })
    }

    const validPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if(!validPass) {
        return res.status(400).json({
            message: "Неверный логин или пароль"
        })
    }

    const token = jwt.sign({
        _id: user._id
    }, 'secret4444',
    {
        expiresIn: '30d'
    })
    const { passwordHash, ...userData } = user._doc;

    res.json({
        ...userData,
        token,
    })
} catch(err) {
    console.log(err);
    res.status(500).json({
        message: ' Не удалось авторизоваться ',
    })
}
}
export const getMe =  async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)

        if(!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Нет'
        })
    }
}
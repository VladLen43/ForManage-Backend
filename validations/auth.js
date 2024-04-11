import { body } from 'express-validator'

export const registerValidation = [
    body('email' , 'Неверный формат почты').isEmail(),
    body('fullName', 'Укажите имя').isLength({min : 3}),
    body('password', 'Укажите пароль').isLength({min: 5}),
    body('avatarUrl', 'Неверная ссылка на аватар').isLength({min : 3}).optional().isString(),
]

export const loginValidation = [
    body('email', ' Неверный формат почты').isEmail(),
    body('password', 'Укажите пароль').isLength({min: 5})
]

export const TodoCreateValidation = [
    body('title', 'Укажите название задачи').isLength({min: 4}),
    body('imageUrl', 'Укажите ссылку на изображение').optional().isString(),
]
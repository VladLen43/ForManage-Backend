import { reverse } from 'dns';
import TodoModel from '../models/Todo.js';


export const getAllTodos = async (req, res) => {
    try {

        const user = req.userId
        const todos = await TodoModel.find({user : user})//.populate('user').exec()
        console.log(user)
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать Дело'
        })
    }
}

// export const getOneTodo = async (req, res) => {
//     try {
//         const id = req.params.id;

//          const todo = await TodoModel.find({_id: id})
//         console.log(user)
//         res.json(todo)
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'Не удалось найти todo'
//         })
//     }
// }
export const getOneTodo = async (req, res) => {
    try {
      const todoId = req.params.id;
  
      TodoModel.findOneAndUpdate(
        { _id: todoId } ,{ returnDocument: "After" } )
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json({ message: "Статья не найдена" }))    
  } catch (err) {
    console.error(err);
  }
  };

export const create = async (req, res) => {
    try {      
       const doc = new TodoModel({
           title: req.body.title,
           imageUrl: req.body.imageUrl,
           user: req.userId,
           completed: false,
           tags: req.body.tags,
           text: req.body.text,
           priority: req.body.priority
       }) 

       const todo = await doc.save();

       res.json(todo);
    
    } catch (error) {
       console.log(error);
       res.status(500).json({
           message: 'Не удалось создать Дело'
       })
    }
}


// export const update = async (req, res) => {
    
//     const todoId = req.params.id;
  
//       await TodoModel.findOneAndUpdate(
//         {
//           _id: todoId,
//         },
//         {
//             title: req.body.title,
//             imageUrl: req.body.imageUrl

//         }).then((doc, err) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({
//                   message: 'Не удалось удалить todo',
//                 });
//               }
      
//               if (!doc) {
//                 return res.status(404).json({
//                   message: 'Todo не найдена',
//                 });
//               }
      
//               res.json({
//                 success: true,
//               });
//         }).catch((reject) => {
//             console.log(reject);
//             res.status(500).json({
//               message: 'Не удалось получить todo',
//             });
//         })     
// }

// 
export const update = async (req, res) => {
    const todoId = req.params.id;
    const comp = req.body.completed;
    const tag = req.body.tags;
    const priority = req.body.priority;

    console.log(req)
    TodoModel.findOneAndUpdate(
        { _id: todoId } ,
        { completed : comp, title: req.body.title, text: req.body.text, imageUrl: req.body.imageUrl, tags: tag, priority: priority  },
        { returnDocument: "After" } )
        .then(doc => res.json(doc))
        .catch(err => res.status(500).json({ message: "Статья не найдена" }))    
  };

export const remove = async (req, res) => {
      const todoId = req.params.id;
  
     TodoModel.findOneAndDelete(
        {
          _id: todoId,
        }).then((doc, err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                  message: 'Не удалось удалить todo',
                });
              }
      
              if (!doc) {
                return res.status(404).json({
                  message: 'Todo не найдена',
                });
              }
      
              res.json({
                success: true,
              });
        }).catch((reject) => {
            console.log(reject);
            res.status(500).json({
              message: 'Не удалось получить todo',
            });
        })
  };
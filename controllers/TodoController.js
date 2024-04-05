import TodoModel from '../models/Todo.js';


export const getAllTodos = async (req, res) => {
    try {
        const todos = await TodoModel.find().populate('user').exec()
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать Дело'
        })
    }
}

export const getOneTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

         await TodoModel.findOneById(todoId)

        res.json({
            success: true,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось найти todo'
        })
    }
}

export const create = async (req, res) => {
     try {
        const doc = new TodoModel({
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            checked: ''
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
    const postId = req.params.id;
    TodoModel.findOneAndUpdate(
        { _id: postId } ,{ title: 't'},{ returnDocument: "After" } )
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
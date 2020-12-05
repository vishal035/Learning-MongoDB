// require('../src/db/mongoose');
// const User = require('../src/models/users');
// const Task = require('../src/models/tasks');

// 5fca715d68886a435890c253

// User.findByIdAndUpdate("5fca715d68886a435890c253", {
//     "email": "vishal@eamil.com"
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({
//         age: 21
//     })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e);
// })

// const updateAgentAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, {age})
//     const count = await User.countDocuments({age})

//     return count
// }


// updateAgentAndCount("5fca715d68886a435890c253", 20).then((count) => {
//     console.log(count);
// }).catch((e)=>{
//     console.log(e);
// })


// const deleteTaskAndCount = async (id, completed) => {
//     const deletedTask = await Task.findByIdAndDelete(id)
//     const count = await Task.countDocuments({completed})

//     return (count)
// }

// deleteTaskAndCount("5fca5b4aca0b2c41883c35c6",true).then((result)=>console.log(result)).catch((e)=>console.log(e))

// const add = (a,b) =>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             if(a < 0 || b < 0){
//                 return reject("Number Must be Positive")
//             }
//             resolve(a+b)
//         },2000)
//     })
// }

// const dowork = async () => {
//     const sum = await add(1,2)
//     const sum2 = await add(sum, 1)
//     const sum3 = await add(sum2, -1)

//     return sum3
// }

// dowork().then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// })
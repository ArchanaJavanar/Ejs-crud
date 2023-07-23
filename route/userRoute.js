const userRoute = require('express').Router()
const userController = require('../controller/userController')


//route.request(path, controller) -> syntax

//all other views (render controller) can be accessed only by get request
userRoute.get('/', userController.index)
userRoute.get('/create', userController.new)
userRoute.get('/edit', userController.edit)

//create new user i.e post route
userRoute.post(`/api/user/new`, userController.newUser)

//to read stored user data ->  get api route
userRoute.get(`/api/user/all`, userController.readUser)

//to read single user data
userRoute.get(`/api/user/:id`, userController.readSingleUser)

//to update single user
userRoute.patch(`/api/user/:id`,userController.updateUser)

//to delete user
userRoute.delete(`/api/user/:id`, userController.deleteUser)

//request method -> all -> only assigned to default route
userRoute.all('**', userController.pnf)

module.exports = userRoute
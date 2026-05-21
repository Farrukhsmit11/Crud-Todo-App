import express, { response } from "express"
import cors from "cors"
import 'dotenv/config';
import "./db/database.js"
import { Todo } from "./models/Todo.js"

const app = express();
const port = 3000
let todos = []

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get("/get-all-todos", async (request, response) => {
    const todoContent = await Todo.find()
    response.send({ todoContent })
})

app.post("/add-todo", async (request, response) => {
    const obj = {
        title: request.body.title,
    }
    const todoData = await Todo.create(obj)
    response.status(200).send({ data: obj, message: "todo added sucessfully" })
})

app.patch("/edit-todo", async (request, response) => {
    const id = request.params.id
    try {
        const edited = await Todo.findOneAndUpdate(id)
        response.status(200).send({ status: 200, message: "todo updated" })
    } catch (error) {
        console.error("error editing todo", error)
    }
})

app.delete("/delete-todo", async (request, response) => {
    const id = request.params.id
    try {
        const res = await Todo.findOneAndDelete(id)
        response.status(200).send({ status: 200, message: "todo deleted" })
    } catch (error) {
        console.error("error", error)
    }
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
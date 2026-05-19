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
    const response2 = await Todo.find()
    response.send({ response2 })
})

app.post("/add-todo", async (request, response) => {
    const obj = {
        title: request.body.title,
    }
    const data1 = await Todo.create(obj)
    response.status(200).send({ data: obj, message: "todo added sucessfully" })
})

app.patch("/edit-todo:id", (request, response) => {
})

app.delete("/delete-todo:id", async (request, response) => {
    const id = request.params.id
    const res = await Todo.findByIdAndDelete()
    if (res) {
        response.status(201).send({ status: 200, message: "todo deleted" })
    } else {
        response.status(200).send({ status: 400, message: "todo not found" })
    }
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
import express, { response } from "express"
import cors from "cors"
import 'dotenv/config';
import "./db/database.js"

const app = express();
const port = 3000
const todos = []

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get("/get-all-todos", (request, response) => {
    response.send({ data: todos });
})

app.post("/add-todo", (request, response) => {
    const obj = {
        todoContent: request.body.todo,
        id: Date.now(),
        completed: false
    }
    todos.push(obj);
    response.status(200).json(obj)
})

app.patch("/edit-todo:id", (request, response) => {
})

app.delete("/delete-todo:id", (request, response) => {
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
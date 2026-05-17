import express from "express"
import cors from "cors"

import "./db/database.js"

const app = express();
const port = 3000
const todos = []

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.get("/get-all-todos", (request, response) => {
    response.send(todos)
})

app.post("/add-todo", (request, response) => {
    response.send({ todoContent: request.body })
})

app.patch("/edit-todo:id", (request, response) => {
})

app.delete("/delete-todo:id", (req, res) => {
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
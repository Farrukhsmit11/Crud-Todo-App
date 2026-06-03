import express, { response } from "express"
import cors from "cors"
import 'dotenv/config';
import { Todo } from "./models/Todo.js"
import { User } from "./models/User.js";
import connectDB from "./config/db/db.js";
import todoRoutes from "./routes/todoRoutes.js"
import authRoutes from "./routes/authRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())

connectDB();

app.use(cors({
    origin: [
        'http://localhost:5173',
        "https://crud-todo-app-frontend.netlify.app"
    ],
    credentials: true
}));

app.use(todoRoutes)
app.use(authRoutes)

app.get("/", (request, response) => {
    response.send("backend working")
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
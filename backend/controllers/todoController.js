import { request } from "express"
import { Todo } from "../models/Todo.js"

export const getTodo = async (request, response) => {
    try {
        const data = await Todo.find()
        response.status(200).json({ data: data })
    } catch (error) {
        console.error("error fetching todos", error)
    }
}

export const addTodos = async (request, response) => {
    try {
        const obj = {
            title: request.body.title
        }
        const data = await Todo.create(obj)
        response.status(200).json({ data: data })
    } catch (error) {
        console.error("errior adding todo")
    }
}

export const deleteTodos = async (request, response) => {
    const id = request.params.id
    try {
        const data = await Todo.findOneAndDelete(id)
        response.status(200).json({ data: data })
    } catch (error) {
        console.error("error deleting todo", error)
    }
}


export const editTodos = async (request, response) => {
    const id = request.params.id
    const { title } = request.body
    try {
        const data = await Todo.findOneAndUpdate(
            { _id: id },
            { title },
            { new: true }
        )
        response.status(200).json({ data: data, message: "todo updated" })
    } catch (error) {
        console.error("error editing todo", error)
    }
}

export default { getTodo, addTodos, deleteTodos, editTodos }
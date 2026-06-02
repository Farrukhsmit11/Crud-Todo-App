import React, { useState } from 'react'
import "./TodoList.css"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Button, Form, Input, message, Spin } from "antd"
import { useEffect } from 'react';
import axios from "axios"
import { PlusOutlined } from "@ant-design/icons"
import { CiEdit } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";
import Loader from "../../components/loader/Loader"

export const getUrl = () => {
  const isProduction = window.location.href.includes("https")
  const baseUrl = isProduction ?
    "https://crud-todo-app-three.vercel.app"
    : "http://localhost:3000"
  return baseUrl
}

const TodoList = () => {

  const [form] = Form.useForm();
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);

  const getTodo = async () => {
    try {
      const response = await axios.get(`${getUrl()}/todos`)
      const data = response?.data?.data
      setTodos(data)
    } catch (error) {
      console.error("error fetching todos", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async () => {
    setIsLoading(true)
    event.preventDefault();
    try {
      await axios.post(`${getUrl()}/add-todos`, {
        title: inputValue
      })
      message.success("Todo added sucessfully ")
      getTodo();
      setInputValue("")
    } catch (error) {
      message.error("todo cannot be empty", error)
    }
  }

  const deleteTodo = async () => {
    event.preventDefault()
    try {
      const deleteTodo = await axios.delete(`${getUrl()}/delete-todos`)
      const deletedData = deleteTodo.data?.data
      getTodo();
      message.success("todo deleted sucessfully")

    } catch (error) {
      console.error("error deleting todo", error)
    }
  }

  const editTodo = async (id) => {
    event.preventDefault();
    try {
      const editTodo = await axios.patch(`${getUrl()}/edit-todos/${id}`, {
        title: editText
      })
      const res1 = editTodo.data?.data
      setIsEditing(false);
      message.success("todo edited sucessfully")
      getTodo();
    } catch (error) {
      console.error("errro editing todo", error)
    }
  }

  useEffect(() => {
    getTodo()
  }, [])

  return (
    <div className="todo-container">
      <div className="todo-card">
        <div className="header">
          <h1 className="todo-title">Todo App</h1>
          <p className='todo-description'>Organize your tasks. Stay productive!</p>
        </div>

        <Form
          onFinish={addTodo}
          layout='vertical'
          form={form}
          className='todo-form'
        >
          <Form.Item
          >
            <Input
              type="text"
              placeholder="What’s on your mind today?"
              prefix={<CiEdit className='add-task-input-icon' />}
              className="todo-input"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              name='title'
            />
          </Form.Item>

          <Button
            icon={<PlusOutlined />}
            className="add-task-btn"
            htmlType='submit'
            disabled={!inputValue}
          >
            Add Task
          </Button>

          {IsLoading ? (
            <Loader />
          ) : (
            <ul className='list-group'>
              {todos?.map((todo, index) => {
                return (
                  <>
                    <div key={index} className="list-parent"
                    >
                      {editId === todo._id ? (
                        <>
                          <Input
                            className='edit-todo-input'
                            onChange={(e) => setEditText(e.target.value)}
                            placeholder='Edit Todo'
                            defaultValue={todo.title}
                          ></Input>
                          <Button
                            disabled={!editText}
                            onClick={() => {
                              setEditText("")
                              setEditId(null)
                              editTodo(todo._id)
                            }}
                            className='save-btn'>Save</Button>
                        </>
                      ) : (
                        <li className='list-item'>{todo.title}
                          <div className="buttons-main">
                            <Button
                              icon={<MdEdit />}
                              onClick={() => {
                                setEditId(todo._id)
                              }}
                              className='edit-btn'
                            ></Button>

                            <Button
                              icon={<FiTrash2 size={18} />}
                              className='delete-btn'
                              onClick={() => deleteTodo()}
                            ></Button>
                          </div>
                        </li>
                      )}
                    </div>
                  </>
                )
              })}
            </ul>
          )}
        </Form>
      </div>
    </div >

  )
}

export default TodoList
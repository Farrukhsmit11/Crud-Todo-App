import React, { useState } from 'react'
import "./TodoApp.css"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Button, Form, Input, message } from "antd"
import { useEffect } from 'react';
import axios from "axios"
import { PlusOutlined } from "@ant-design/icons"

const TodoApp = () => {

  const [form] = Form.useForm();
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false)

  const BASE_URL = "http://localhost:3000"

  const onSubmit = (values) => {
    console.log(values);
  }

  const getTodo = async () => {
    const response = await axios.get(`${BASE_URL}/get-all-todos`)
    const data = response?.data?.todoContent
    setTodos(data)
  }

  const addTodo = async () => {
    event.preventDefault();
    try {
      await axios.post(`${BASE_URL}/add-todo`, {
        title: inputValue
      })
      message.success("Todo added sucessfully ")
      getTodo();
      setInputValue("")
    } catch (error) {
      console.error("todo cannot be empty", error)
      message.error("todo cannot be empty")
    }
  }

  const deleteTodo = async () => {
    event.preventDefault()
    try {
      const deleteTodo = await axios.delete(`${BASE_URL}/delete-todo`)
      const one = deleteTodo.data?.res
      message.success("todo deleted sucessfully")
      getTodo();
    } catch (error) {
      console.error("error deleting todo", error)
    }
  }

  const editTodo = async (id) => {
    event.preventDefault();
    try {
      const editTodo = await axios.patch(`${BASE_URL}/edit-todo/${id}`, {
        title: editText
      })
      const res1 = editTodo.data?.edited
      setIsEditing(false);
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
        <h1 className="todo-title">Todo App</h1>
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
          >
            Add Task
          </Button>
          <ul className='list-group'>
            {todos?.map((todo, index) => {
              return (
                <div key={index} className="list-parent"
                >
                  {editId === todo._id ? (
                    <>
                      <Input
                        className='edit-todo-input'
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder='Edit Todo'
                        value={editText}
                      ></Input>
                      <Button
                        onClick={() => {
                          setEditText("")
                          setEditId(null)
                          editTodo(todo._id)
                        }
                        }
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
                          icon={<MdDelete />}
                          className='delete-btn'
                          onClick={() => deleteTodo()}
                        ></Button>
                      </div>
                    </li>
                  )}
                </div>
              )
            })}
          </ul>
        </Form>
      </div>
    </div >

  )
}

export default TodoApp
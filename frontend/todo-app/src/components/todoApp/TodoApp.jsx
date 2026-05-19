import React, { useState } from 'react'
import "./TodoApp.css"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Button, Form, Input, message } from "antd"
import { Formik } from "formik"
import { todoSchema } from "./Validations"
import { useEffect } from 'react';
import axios from "axios"
import { PlusOutlined } from "@ant-design/icons"

const TodoApp = () => {

  const [form] = Form.useForm();
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState("");

  const BASE_URL = "http://localhost:3000"

  const initialValues = {
    task: ""
  }

  const onSubmit = (values) => {
    console.log(values);
  }

  const getTodo = async () => {
    const response = await axios.get(`${BASE_URL}/get-all-todos`)
    const data = response?.data?.response2
    setTodos(data)
    console.log("response", response)
  }

  const addTodo = async () => {
    try {
      await axios.post(`${BASE_URL}/add-todo`, {
        title: inputValue
      })
      setInputValue("")
    } catch (error) {
      console.error("todo cannot be empty", error)
    }
  }

  const deleteTodo = async () => {
    try {
      await axios.delete(`${BASE_URL}/delete-todo:id`)
    } catch (error) {
      console.error("error deleting todo", error)
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
          <Form.Item>
            <Input
              type="text"
              placeholder="Enter your task"
              className="todo-input"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              name='task'
            />
          </Form.Item>

          <Button
            icon={<PlusOutlined />}
            className="add-task-btn"
            htmlType='submit'
          >
            Add Task
          </Button>

          <div>
            {todos?.map((item, index) => {
              return (
                <div key={index}>
                  <ul className='todos-list'>
                    <li>{item.title}</li>
                  </ul>

                  <div className="button-group">
                    <Button className="edit-btn">Edit</Button>
                    <Button
                      onClick={() => deleteTodo()}
                      className="delete-btn"
                    >Delete</Button>
                  </div>
                </div>
              )
            })}
          </div>
        </Form>
      </div>
    </div >

  )
}

export default TodoApp
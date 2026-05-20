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

  const onSubmit = (values) => {
    console.log(values);
  }

  const initialValues = {
    task: ""
  }

  const getTodo = async () => {
    const response = await axios.get(`${BASE_URL}/get-all-todos`)
    const data = response?.data?.todoContent
    setTodos(data)
    console.log("response", response)
  }

  const addTodo = async () => {
    event.preventDefault()
    try {
      await axios.post(`${BASE_URL}/add-todo`, {
        title: inputValue
      })
      getTodo();
      setInputValue("")
    } catch (error) {
      console.error("todo cannot be empty", error)
    }
  }

  const deleteTodo = async () => {
    event.preventDefault()
    try {
      const deleteTodo = await axios.delete(`${BASE_URL}/delete-todo`)
      const one = deleteTodo.data?.res
      getTodo();
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

        <Formik
          initialValues={initialValues}
          validationSchema={todoSchema}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            errors,
            touched
          }) => (
            <Form
              onFinish={addTodo}
              layout='vertical'
              form={form}
              className='todo-form'
            >
              <Form.Item
                validateStatus={errors.task && touched.task ? "error" : ""}
                help={
                  errors.task && touched.task ? (
                    <span className='form-error'>{errors.task}</span>
                  ) : null
                }
              >
                <Input
                  type="text"
                  placeholder="Enter your task"
                  onBlur={handleBlur}
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
                      <li className='list-item'>{todo.title}
                      </li>
                      <div className="buttons-main">
                        <Button className='edit-btn'>Edit</Button>
                        <Button
                          onClick={() => deleteTodo()}
                          className='delete-btn'
                        >Delete
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </ul>
            </Form>
          )
          }
        </Formik>
      </div>
    </div >

  )
}

export default TodoApp
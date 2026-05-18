import React, { useState } from 'react'
import "./TodoApp.css"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Button, Form as AntForm, Input, message } from "antd"
import { Formik } from "formik"
import { todoSchema } from "./Validations"
import { useEffect } from 'react';
import axios from "axios"
import { PlusOutlined } from "@ant-design/icons"

const TodoApp = () => {

  const [form] = AntForm.useForm();
  const [todos, setTodos] = useState([])
  const [inputValue, setInputVlaue] = useState("");

  const BASE_URL = "http://localhost:3000"

  const initialValues = {
    task: ""
  }

  const onSubmit = (values) => {
    console.log(values);
  }

  const getTodos = async () => {
    event.preventDefault()
    try {
      const response = await axios.get(`${BASE_URL}/get-all-todos`)
      setTodos(response.data.data)
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching todos", error)
    }
  }

  const addTodo = async () => {
    event.preventDefault();
    try {
      const handlePost = await axios.post(`${BASE_URL}/add-todo`,
        {
          todoContent: inputValue
        }
      )
    } catch (error) {
      console.error("error adding todo", error)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h1 className="todo-title">Todo App</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={todoSchema}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values,
            errors,
            touched
          }) => (
            <>
              <AntForm
                className="todo-form"
                form={form}
                layout='vertical'
                onFinish={addTodo}
              >
                <AntForm.Item
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
                    className="todo-input"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.task}
                    name='task'
                  />
                </AntForm.Item>
                <Button
                  icon={<PlusOutlined />}
                  className="add-task-btn"
                  htmlType='submit'
                >
                  Add Task
                </Button>

                {todos.map((todo) => {
                  return (
                    <div key={todo.id}>
                      <ul className='todos-list'>
                        <li>
                          {todo.todoContent}
                        </li>
                      </ul>

                      <div className="todo-form-actions">
                        <Button className='edit-btn'>Edit</Button>
                        <Button className='delete-btn'>Delete</Button>
                      </div>
                    </div>
                  )
                })}
              </AntForm>
            </>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default TodoApp
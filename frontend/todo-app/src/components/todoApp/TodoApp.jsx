import React, { useState } from 'react'
import "./TodoApp.css"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Button, Form as AntForm, Input } from "antd"
import { Formik } from "formik"
import { todoSchema } from "./Validations"
import { useEffect } from 'react';
import axios from "axios"

const TodoApp = () => {

  const [form] = AntForm.useForm();
  const [todos, setTodos] = useState([])

  const initialValues = {
    todotitle: ""
  }

  const onSubmit = (values) => {
    console.log(values);
  }

  const getTodo = async () => {
    const response = await axios("http://localhost:3000/get-all-todos")
  }

  useEffect(() => {
    getTodo();
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
            <AntForm
              className="todo-form"
              form={form}
              layout='vertical'
              onFinish={handleSubmit}
            >
              <AntForm.Item
               
              >
                <Input
                  type="text"
                  placeholder="Enter your task"
                  className="todo-input"
                  onBlur={handleBlur}
                  onChange={(e) => setTodos(e.target.value)}
                  value={values.todotitle}
                  name='todotitle'
                />
              </AntForm.Item>
              <Button className="add-task-btn" htmlType='submit'>
                Add Task
              </Button>
            </AntForm>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default TodoApp
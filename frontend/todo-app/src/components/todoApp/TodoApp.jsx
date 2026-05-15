import React from 'react'
import "./TodoApp.css"
import { Formik } from "formik"
import { todoSchema } from './Validations'
import { Form as AntForm, Button, Col, Divider, Input, Row, Tabs } from "antd"
import { PlusOutlined, CheckOutlined } from "@ant-design/icons"
import { CiLight } from "react-icons/ci";
import { LuListTodo } from "react-icons/lu";
import todoIcon from "../../assets/icon.png"

const TodoApp = () => {

  const [form] = AntForm.useForm()

  const initialValues = {
    todotitle: ""
  }

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  }

  return (
    <div className='todo-app-container'>
      <div className="todo-card">
        <h1 className='todo-title'>To-Do-List
          <img src={todoIcon} className='todo-icon' />
        </h1>

        <div className="input-group">
          <Formik
            initialValues={initialValues}
            validationSchema={todoSchema}
            onSubmit={onSubmit}
          >
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              handleReset,
              errors,
              values,
              touched
            }) => (
              <AntForm
                form={form}
                layout='vertical'
                className='todo-form'
                onFinish={handleSubmit}
              >
                <div className='input-group'>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Add your Task'
                    className='add-task-input'
                    name='todotitle'
                    id='todo-input'
                  ></Input>

                  <Button
                    htmlType='submit'
                    className='add-task-btn'
                  >ADD
                  </Button>

                </div>

              </AntForm>
            )}
          </Formik>
        </div>


      </div>
    </div>
  )
}

export default TodoApp
import React from 'react'
import { Form as AntForm, Button, Input, message } from "antd"
import "./ResetPassword.css"
import { Formik } from 'formik';
import { resetPasswordSchema } from './ResetPasswordSchema';
import axios from "axios"
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const ResetPassword = () => {

  const [form] = AntForm.useForm();
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlSubmit = (values) => {
    console.log("values", values);
    form.resetFields();
  }

  const {token} = useParams();

  const BASE_URL = "http://localhost:3000"

  const initialValues = {
    password: "",
    confirmPassword: ""
  }

  const navigate = useNavigate()


  const handleResetPassword = async () => {


    try {
      const response = await axios.post(`${BASE_URL}/reset-password/${token}`, {
        newPassword,
        confirmPassword
      })
      const reset = response?.data.data
      message.success("Password reset sucessfully")
      navigate("/login")
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message)
      }

      console.error("error reseting password")
    }
  }

  return (
    <div className='auth-container'>
      <div className="auth-card">
        <h1 className='auth-title'>Reset Password</h1>

        <Formik
          validationSchema={resetPasswordSchema}
        >

          {({
            handleSubmit,
            handleBlur,
            handleChange
          }) => (
            <AntForm
              form={form}
              layout='vertical'
              onFinish={handlSubmit}
            >
              <AntForm.Item
                label="Password"
              >
                <Input.Password
                  onChange={(e) => setNewPassword(e.target.value.trim())}
                  placeholder='Password'
                  value={newPassword}
                  type="password"
                  name='password'
                  className='form-input'
                ></Input.Password>
              </AntForm.Item>

              <AntForm.Item

                label={<span className='form-label'>Confirm Password</span>}
              >
                <Input.Password
                  placeholder=' Confirm Password'
                  onChange={(e) => setConfirmPassword(e.target.value.trim())}
                  value={confirmPassword}
                  type="password"
                  name='password'
                  className='form-input'
                ></Input.Password>
              </AntForm.Item>

              <div className='submit-actions'>
                <Button
                  onClick={() => handleResetPassword()}
                  className='reset-password-btn'
                  htmlType='submit'
                >Reset Password</Button>

              </div>

            </AntForm>
          )
          }
        </Formik>
      </div>
    </div>
  )
}

export default ResetPassword
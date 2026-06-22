import React from 'react'
import { Form as AntForm, Button, Input, message } from "antd"
import "./ResetPassword.css"
import { Formik } from 'formik';
import { resetPasswordSchema } from './ResetPasswordSchema';
import axios from "axios"
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

  const [form] = AntForm.useForm();
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")

  const location = useLocation();

  const resetEmail = location.state?.email

  const handlSubmit = (values) => {
    console.log("values", values);
    form.resetFields();
  }

  const BASE_URL = "http://localhost:3000"

  const navigate = useNavigate()

  const handleResetOtp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/verify-reset-otp`, {
        email: resetEmail,
        otp
      })
      const data = res.data?.otpData
      message.success(" Reset OTP Verified sucessfully")
      navigate("/changePassword", { state: { email: resetEmail } })
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message)
      }
      console.error("error", error)
    }
  }

  return (
    <div className='auth-container'>
      <div className="auth-card">
        <div className="auth-header">
          <h1 className='reset-password-title'>Reset Password</h1>
          <p className='auth-description'>Enter 6-digit code sent to your email </p>
        </div>

        <Formik
          validationSchema={resetPasswordSchema}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values
          }) => (
            <AntForm
              form={form}
              layout='vertical'
              onFinish={handlSubmit}
            >
              <AntForm.Item
                label={<span className='form-label'> Verification Code</span>}
              >
                <Input.OTP
                  separator="-"
                  onChange={(value) => setOtp(value)}
                  size="medium"
                  length={6}
                >
                </Input.OTP>
              </AntForm.Item>


              <div className='submit-actions'>
                <Button
                  onClick={() => handleResetOtp()}
                  className='reset-password-btn'
                  htmlType='submit'
                >Reset Password
                </Button>
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
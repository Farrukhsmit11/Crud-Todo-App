const otpTemplate = (otp) => {
    return `
  <div>
      <h2>OTP Verification:</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP expires in 5 minutes.</p>
    </div>
`
}

export default otpTemplate
import crypto from "crypto"

export function generateOtp() {
    return crypto.randomInt(100000, 999999).toString()
}

export function getOtpHtml(otp) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;

            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff; 
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
        h1 {
            color: #333;
        }
        p { 
            color: #555;
        }   
      </style>
`
}

export default { generateOtp, getOtpHtml }
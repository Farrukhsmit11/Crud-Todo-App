const forgotPasswordTemplate = ({ resetUrl, userEmail }) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">

            <h2 style="color: #333; margin-bottom: 10px;">Reset Your Password</h2>

            <p style="color: #555; font-size: 16px; line-height: 1.5;">
                We received a request to reset your password. Click the button below to create a new password.
            </p>

            <div style="text-align: center; margin: 30px 0;">
            <h1>hello ${userEmail}</h1>
                <a href="${resetUrl}" target="_blank"
                    style="
            background-color: #007bff;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
          ">
                    Reset Password
                </a>
            </div>

            <p style="color: #777; font-size: 14px; line-height: 1.5;">
                If the button doesn’t work, copy and paste this link into your browser:
            </p>

            <p style="word-break: break-all; font-size: 14px;">
                <a href="${resetUrl}" target="_blank" style="color: #007bff;">
                    Click here to reset your password
                </a>
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />

            <p style="color: #999; font-size: 12px; line-height: 1.4;">
                This link will expire soon for security reasons. If you did not request this password reset, you can safely ignore this email.
            </p>

        </div>
    </div>
    `;
}

export default forgotPasswordTemplate
const signupTemplate = (userEmail) => {
    return `
     <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.08);">
      
      <div style="background:linear-gradient(135deg,#4f46e5,#06b6d4);padding:30px;text-align:center;color:white;">
        <h1 style="margin:0;font-size:24px;">Welcome Aboard 🚀</h1>
        <p style="margin:5px 0 0;font-size:14px;opacity:0.9;">Your account has been 
        created successfully</p>
      </div>

      <div style="padding:30px;color:#333;">
        <h2 style="margin-top:0;">Hi there 👋</h2>
        
        <p style="font-size:15px;line-height:1.6;">
          Thanks for signing up! We're excited to have you on board.
           Your account is now active and ready to use.
        </p>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;padding:15px;border-radius:8px;margin:20px 0;">
          <p style="margin:0;font-size:14px;">
            <strong>Email:</strong> ${userEmail}
          </p>
        </div>

        <p style="font-size:15px;line-height:1.6;">
          You can now log in and 
          start exploring all features.
        </p>

        <div style="text-align:center;margin:30px 0;">
         <a href="http://localhost:5173/login"
         style="background:#4f46e5;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;font-size:14px;    display:inline-block;"
        >
        Go to Login
        </a>
        </div>
    </div>
  </div>
  `
}

export default signupTemplate
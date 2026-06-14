import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (toEmail, token) => {
  const verifyLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
  console.log("About to send email");
  
  await transporter.sendMail({
    from: `"City Connect" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify your email – City Connect",
    html: `
      <h2>Welcome to City Connect!</h2>
      <p>Please verify your email by clicking the link below. It expires in 24 hours.</p>
      <a href="${verifyLink}">${verifyLink}</a>
      <p>If you didn't sign up, ignore this email.</p>
    `,
  });
  console.log("Email sent successfully");
};

export const sendPasswordResetEmail = async (toEmail, token) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await transporter.sendMail({
    from: `"City Connect" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Password Reset Request – City Connect",
    html: `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password. It expires in 30 minutes.</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};

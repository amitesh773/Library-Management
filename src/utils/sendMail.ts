import { transporter } from "../config/mail.js";
import { credentials } from "../config/credentials.js";

export const sendSingupconfirmationMail = async (
  email: string,
  name: string,
  surname: string,
) => {
  const info = await transporter.sendMail({
    from: credentials.MAIL_FROM,
    to: email,
    subject: "Library Management - singup confirmation ",
    html: `
      <h2>Welcome ${name}! ${surname} 🎉</h2>

      <p>
          Your Library Management account has been successfully created.
      </p>

      <p>
          You can now login using your registered email and password.
      </p>

      <br />

      <p>
          Thank you for joining us.
      </p>

      <strong>Library Management Team</strong>

      `
  })

  return info;
}
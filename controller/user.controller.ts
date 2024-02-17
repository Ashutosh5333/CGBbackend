import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import { UserModel, IUser } from "../model/User.model";

const sendEmail = async (
  name: string,
  email: string,
  message: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "lakshakarashutosh@gmail.com",
        pass: "kyisyoouwrlajazd",
      },
    });

    const mailOptions = {
      from: "lakshakarashutosh@gmail.com",
      to: email,
      subject: "Welcome to CGB Solutions - Crafting Future-Ready Workplaces",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333333; margin-bottom: 20px;">Welcome to CGB Solutions!</h2>
            <p style="color: #666666; line-height: 1.5;">
              Hi ${name},<br><br>
              We are thrilled to have you join CGB Solutions, where we envision and create technologically advanced, user-friendly, and environmentally sustainable workplaces that are prepared for the future.
            </p>
            <p style="color: #666666; line-height: 1.5;">
                     We will connect with you 
            </p>
            <p style="color: #666666; line-height: 1.5;">
              At CGB Solutions, we believe in harnessing innovation and design to transform traditional workspaces into dynamic environments that inspire creativity, collaboration, and productivity. 
              Our team is dedicated to delivering tailored solutions that exceed your expectations and propel your organization forward.
            </p>
            <p style="color: #666666; line-height: 1.5;">
              We look forward to embarking on this journey with you and helping you unlock the full potential of your workplace.
            </p>
            <p style="color: #666666; line-height: 1.5;">
              Should you have any questions or require further assistance, feel free to reach out to us at <a href="mailto:info@cgb.com" style="color: #007bff; text-decoration: none;">info@cgb.com</a>.
            </p>
            <p style="color: #666666; line-height: 1.5;">
              Best Regards,<br>
              The CGB Solutions Team
            </p>
          </div>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent.", info.response);
      }
    });
  } catch (error) {
    // Handle the error appropriately, e.g., log or respond with an error status
    console.error(error);
    throw new Error(`Failed to send email: ${error}`);
  }
};

const RegisterUserinfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, message } = req.body;

  try {
    let user: IUser | null = await UserModel.findOne({ email });

    if (user) {
      let msgKey = 1;
      while (user.messages.find((msg) => msg.msgKey === `msg${msgKey}`)) {
        msgKey++;
      }
      user.messages.push({ msgKey: `msg${msgKey}`, message });
    } else {
      user = new UserModel({
        name,
        email,
        messages: [{ msgKey: "msg1", message }],
      });
    }

    await user.save();
    await sendEmail(name, email, message);

    res.status(201).json({ msg: "Message sent successfully", userinfo: user });
  } catch (err) {
    console.log("Error:", err);
    res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const  Getuserdata = async(req: Request,
  res: Response,
  next: NextFunction):Promise<void> =>{

    try {
        const userdata = await UserModel.find()
      
        res.status(201).json({ msg: "Message sent successfully", userinfo: userdata })
    }
    catch(err){
      console.log(res)
    }
            
}

export { RegisterUserinfo ,Getuserdata};

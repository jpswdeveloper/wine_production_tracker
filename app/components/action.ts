"use server";
import { RegisterSchemaType } from "../utils/schema/register";
import { createUser, findSingleUser } from "../server/user/index";
import bcrypt from "bcryptjs";
import { session } from "../utils/session";
export const auth_login_action = async (data: any, form: FormData) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const user = await findSingleUser({ email });
  if (!user) {
    return {
      success: false,
      message: "Unauthorized"
    };
  }

  session({ userId: user.id });
  return {
    success: true,
    data: { email, password },
    message: "Login successfully ✌️✌️"
  };
};

// Registration

export const auth_register_action = async (data: RegisterSchemaType) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      middle_name,
      phone_number
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      middle_name,
      phone_number
    });

    return {
      success: true,
      message: "Registration successfully ✌️✌️"
    };
  } catch (error: any) {
    console.log("error", error);
    return {
      success: false,
      message: "Something is wrong"
    };
  }
};

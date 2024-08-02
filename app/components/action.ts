"use server";
import { RegisterSchemaType } from "../utils/schema/register";
import { createUser, findSingleUser } from "../server/user/index";
import bcrypt from "bcryptjs";
import { destroySession, session, verifyData } from "../utils/session";
import { Prisma, User } from "@prisma/client";
import { createWineDA } from "../server/wine/create";
import { WineT } from "../utils/schema/wine";
import { NextRequest, NextResponse } from "next/server";
import { request } from "http";
import { useRouter } from "next/router";
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
    data: { email, password, user },
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

// Wine Action
export const createWineAction = async (
  data: WineT
): Promise<{
  message: string;
  status: number;
  success: boolean;
}> => {
  try {
    const { userId, ...otherData } = data;
    console.log("data", otherData, userId);
    await createWineDA({
      ...otherData,
      user: {
        connect: {
          id: userId
        }
      }
    });
    return {
      message: "Wine created successfully",
      status: 200,
      success: true
    };
  } catch (error: any) {
    return {
      message: error?.message || "Failed to create wine",
      status: error?.status || 400,
      success: false
    };
  }
};
export const getUser = async (request?: NextRequest) => {
  try {
    // console.log("Get user Middle ware is running");
    // const token = request.cookies.get("userToken");
    // if (!token) {
    //   throw Error("Unauthorized");
    // }
    // const verifyUser = await verifyData(token?.value as string);
    // console.log("ver", verifyUser);
    // if (verifyUser.status == 401) {
    //   return NextResponse.redirect(new URL("/auth/login", request.url));
    // }
    // return verifyUser.payload as User | null;
  } catch (e) {
    // return NextResponse.redirect(new URL("/auth/login", request.url));
  }
};

export const logoutAction = async () => {
  destroySession();
};

import { FaPhoneAlt } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import zod from "zod";
export type RegisterSchemaType = {
  email: string;
  password: string;
  middle_name: string;
  last_name: string;
  first_name: string;
  phone_number: string;
};

export const RegisterSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
  middle_name: zod.string().min(3),
  last_name: zod.string().min(3),
  first_name: zod.string().min(3),
  phone_number: zod.string().min(3)
});

export type UserEntriesType = {
  name: keyof RegisterSchemaType;
  placeholder: string;
  icon?: IconType;
};
export const userEntries: UserEntriesType[] = [
  {
    name: "first_name",
    placeholder: "First Name",
    icon: IoPersonCircleSharp
  },
  {
    name: "middle_name",
    placeholder: "Middle Name",
    icon: IoPersonCircleSharp
  },
  { name: "last_name", placeholder: "Last Name", icon: IoPersonCircleSharp },

  { name: "email", placeholder: "email" },
  { name: "password", placeholder: "password" },

  { name: "phone_number", placeholder: "Phone Number", icon: FaPhoneAlt }
];

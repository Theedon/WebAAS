import * as z from "zod";
const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Enter email address" })
    .email("Valid email required"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
});

const registerFormSchema = z.object({
  email: z.string({ required_error: "Enter email address" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
  firstName: z.string({ required_error: "Enter your first name" }).min(5),
  lastName: z.string({ required_error: "Enter your last name" }).min(5),
  faculty: z.string({ required_error: "choose faculty" }).min(3),
  clerkId: z.string({ required_error: "set id" }).min(3),
});

export { loginFormSchema, registerFormSchema };

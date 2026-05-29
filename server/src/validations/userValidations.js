import mongoose from "mongoose";
import {z} from "zod";

const createUserValidator = z.object({
  body: z.object({
    name: z
      .string({
        error: issue => (!issue.input ? "Name is required" : "Invalid input"),
      })
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name cannot exceed 50 characters"),

    email: z
      .string({error: issue => (!issue.input ? "Name is required" : "Invalid input")})
      .trim()
      .email("Please provide a valid email address"),

    role: z
      .enum(["admin", "user"], "Invalid option, Please only enter the allowed ones")
      .default("user"),

    password: z
      .string({
        error: issue => (!issue.input ? "Password is required" : "Invalid password"),
      })
      .min(6, "Password must be at least 6 characters long"),

    organization: z
      .string({
        required_error:
          "User must belong to an organization, Please provide a organization Id",
      })
      // .length(24, "ID must be exactly 24 characters"),
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid Organization ID format",
      }),
  }),
});

const loginUserValidator = z.object({
  body: z.object({
    email: z
      .string({error: issue => (!issue.input ? "Email is required" : "Invalid email")})
      .trim()
      .email("Please provide a valid email address"),
    password: z
      .string({
        error: issue => (!issue.input ? "Password is required" : "Invalid Password"),
      })
      .min(6, "Password must have at least 6 characters"),
  }),
});

export {createUserValidator, loginUserValidator};

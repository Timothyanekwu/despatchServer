import { z } from "zod";

export const signupValidator = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  email: z.email(),
  phoneNumber: z
    .string()
    .min(11, {
      message: "Phone number must be at least 11 digits",
    })
    .refine(
      (value) => {
        return /^\d+$/.test(value);
      },
      {
        message: "Phone number must contain only digits",
      }
    ),
  address: z.string().min(3, {
    message: "Address must be at least 3 characters long",
  }),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    }),
});

export const loginValidator = z.object({
  email: z.email(),
  password: z.string().min(8),
});
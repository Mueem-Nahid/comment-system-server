// req validation
import { z } from 'zod';
import { userRole } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
    name: z.string({
      required_error: 'name is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.string().optional(),
  }),
});

const updateMyProfileZodSchema = z.object({
  body: z.object({
    password: z
      .string()
      .nonempty({ message: 'Password cannot be empty' })
      .optional(),
    name: z
      .object({
        firstName: z
          .string()
          .nonempty({ message: 'First name cannot be empty' })
          .optional(),
        lastName: z
          .string()
          .nonempty({ message: 'Last name cannot be empty' })
          .optional(),
      })
      .optional(),
    phoneNumber: z
      .string()
      .nonempty({ message: 'Phone number cannot be empty' })
      .optional(),
    address: z
      .string()
      .nonempty({ message: 'Address cannot be empty' })
      .optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  updateMyProfileZodSchema,
};

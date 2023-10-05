import { z } from 'zod';
import { role } from './admin.constant';

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};

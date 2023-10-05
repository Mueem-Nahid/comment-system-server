import { z } from 'zod';

const createPostZodSchema = z.object({
  body: z.object({
    post: z.string({
      required_error: 'Post is required',
    }),
    user: z.string({
      required_error: 'user id is required',
    }),
  }),
});

export const PostValidation = {
  createPostZodSchema,
};

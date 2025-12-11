import z, { email } from "zod";

export const loginValidator = z.object({
  body: z.object({
    phoneNumber: z
      .string()
      .regex(/^(09\d{9}|\+989\d{9})$/, "شماره همراه غیر مجاز است"),
    password: z.string(),
  }),
});

export type loginValidator = z.infer<typeof loginValidator>;
import { z } from "zod";
export const formSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "invalid email address",
  }),
  phone: z.string().regex(/^\d{11}$/, { message: "invalid phone number" }),
  address: z.string().max(200),
});

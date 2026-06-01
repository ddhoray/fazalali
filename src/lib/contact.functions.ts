import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(4).max(4000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ContactSchema.parse(data))
  .handler(async ({ data }) => {
    // For now: log the message. Wire to an email provider when ready.
    console.log("[contact]", {
      at: new Date().toISOString(),
      name: data.name,
      email: data.email,
      length: data.message.length,
    });
    return { ok: true };
  });

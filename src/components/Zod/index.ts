import { z } from "zod";

export const ZodRegister = z
  .object({
    name: z.string().min(3, "Nome precisa conter pelo menos 3 caracteres"),
    email: z
      .string()
      .nonempty("Email é obrigatório")
      .email("Forneça um email válido"),
    password: z
      .string()
      .min(8, "Senha deve conter pelo menos 8 caracteres")
      .regex(/(?=.*['A-Z'])/, "É necessário pelo menos uma letra maiúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
      .regex(/[^a-zA-Z 0-9]+/g, "É necessário pelo menos um simbolo"),
    confirm: z.string().min(1, "Confirmar senha é obrigatório"),
  })
  .refine(({ password, confirm }) => confirm === password, {
    message: "A confirmação e a senha precisam corresponder",
    path: ["confirm"],
  });

export type TRegisterFormValues = z.infer<typeof ZodRegister>;

export const ZodLogin = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Forneça um e-mail válido!"),
  password: z.string().nonempty("A senha é obrigatória"),
});

export type TLoginFormValues = z.infer<typeof ZodLogin>;

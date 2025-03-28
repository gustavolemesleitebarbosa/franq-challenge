"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { account } from "@/lib/appwrite";

const registerFormSchema = z
  .object({
    name: z.string().min(1, "Por favor, insira um nome."),
    email: z
      .string()
      .email("Por favor, insira um endereço de e-mail válido.")
      .min(1, "Por favor, insira um endereço de e-mail."),
    password: z
      .string()
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
      .min(8, "A senha deve conter pelo menos 8 caracteres.")
      .min(1, "Por favor, insira uma senha."),
    confirmPassword: z.string().min(1, "Por favor, confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Persist user data to localStorage
  const saveToLocalStorage = (data: RegisterFormValues) => {
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("sessionLogIn", new Date().toISOString());
  }

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await account.create(uuidv4(), data.email, data.password, data.name);
      await account.createEmailPasswordSession(data.email, data.password);
      saveToLocalStorage(data); // Save to localStorage
      alert("Registro realizado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Falha ao registrar. Verifique o console para detalhes.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="usuario@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="•••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="•••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full hover:cursor-pointer">
          Registrar
        </Button>
      </form>
    </Form>
  );
}

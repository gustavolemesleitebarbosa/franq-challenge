"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
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
import { account } from "@/lib/appwrite"; // Import the singleton


const loginFormSchema = z.object({
  email: z.string().email("Por favor, insira um endereço de e-mail válido."),
  password: z
    .string()
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
    .min(8, "A senha deve conter pelo menos 8 caracteres."),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await account.createEmailPasswordSession(data.email, data.password);
      alert("Sucesso. Seja bem-vindo!");
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Falha no login. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="seuemail@examplo.com"
                  autoComplete="email"
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="•••••••"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full hover:cursor-pointer">
          Login
        </Button>
      </form>
      <h6 className="mt-4 mb-4 text-sm">Ainda Não tem uma conta?</h6>
      <Button
        onClick={() => router.push("/register")}
        variant="outline"
        className="w-full hover:cursor-pointer"
      >
        Sign Up
      </Button>
    </Form>
  );
}

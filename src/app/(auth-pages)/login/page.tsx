"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";

function LoginPage() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setSubmitting(true);
    console.log(values);

    const res = await signIn("credentials", {
      redirect: false,
      email: values.email.trim(),
      password: values.password.trim(),
      callback: "/",
    });
    if (res?.error) {
      setLoginError(res.error);
      toast({
        title: "Error logging in",
        description: "Email or password incorrect",
        variant: "destructive",
      });
    } else {
      setLoginError(null);
    }
    setSubmitting(false);
  };

  const disableSubmitButton = (rForm: typeof form) => {
    const errors = rForm.formState.errors;
    const disable: boolean =
      errors.email || errors.password || submitting ? true : false;

    return disable;
  };
  return (
    <div className="grid h-full place-items-center md:w-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    // placeholder="name@email.com"
                    {...field}
                  ></Input>
                </FormControl>
                <FormDescription>Email address</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    // placeholder="password"
                    {...field}
                  ></Input>
                </FormControl>
                <FormDescription>Password</FormDescription>
              </FormItem>
            )}
          />

          <Button
            disabled={disableSubmitButton(form)}
            type="submit"
            className={`${
              disableSubmitButton(form) ? "bg-foreground text-background" : ""
            }`}
          >
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <p>Login</p>
            )}
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}

export default LoginPage;

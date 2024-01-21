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
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") {
      console.log(JSON.stringify(session.data.user?.email));
      router.push("/");
    }
  }, [session, router]);
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid space-y-8 border-muted md:border md:p-5 md:shadow-sm"
        >
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
      <Link
        className="mt-3 text-xs font-semibold text-destructive underline"
        href={"/signup"}
      >
        Dont have an account yet? Click here to register
      </Link>
    </div>
  );
}

export default LoginPage;

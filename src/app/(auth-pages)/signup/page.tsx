"use client";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { registerFormSchema } from "@/lib/validators";
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
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SignUpPage() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const REGISTER_USER = gql`
    mutation RegisterUser(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
      $faculty: String!
    ) {
      createUser(
        password: $password
        firstName: $firstName
        lastName: $lastName
        email: $email
        facultyCode: $faculty
      )
    }
  `;
  const [registerMutation, { error }] = useMutation<any>(REGISTER_USER);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      faculty: "",
    },
  });

  const disableSubmitButton = (rForm: typeof form) => {
    const errors = rForm.formState.errors;
    const disable: boolean =
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.password ||
      errors.faculty
        ? true
        : false;

    return disable;
  };

  const onSubmit = (values: z.infer<typeof registerFormSchema>): void => {
    setSubmitting(true);
    console.log(values);
    registerMutation({
      variables: {
        password: values.password,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        faculty: values.faculty,
      },
    })
      .then(() =>
        signIn("credentials", {
          redirect: false,
          email: values.email.trim(),
          password: values.password.trim(),
          callbackUrl: "/",
        }),
      )
      .then(() => router.push("/"))
      .catch((e) => {
        toast({
          title: "Error",
          description: "Please try again later",
          variant: "destructive",
        });
        setRegisterError((e as Error).message);
        console.error(registerError);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="grid h-full place-items-center md:w-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid  space-y-8"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John" {...field}></Input>
                </FormControl>
                <FormDescription>
                  Please fill in your first name
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Doe" {...field}></Input>
                </FormControl>
                <FormDescription>Please fill in your last name</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SCI">Sciences</SelectItem>
                      <SelectItem value="ART">Arts</SelectItem>
                      <SelectItem value="COM">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@email.com"
                    {...field}
                  ></Input>
                </FormControl>
                <FormDescription>
                  Please fill in your email address
                </FormDescription>
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
                    placeholder="password"
                    {...field}
                  ></Input>
                </FormControl>
                <FormDescription>Please fill in your password</FormDescription>
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
              <p>Sign up</p>
            )}
          </Button>
        </form>
      </Form>
      <Toaster />
      <Link className="mt-3 text-xs underline " href={"/login"}>
        Already have an account? Click here to sign in
      </Link>
    </div>
  );
}

export default SignUpPage;

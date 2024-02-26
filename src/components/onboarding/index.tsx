"use client";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";

import {
  RegisterUserMutation,
  RegisterUserMutationVariables,
} from "./__generated__/index.generated";

type OnboardingProps = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  userId: string;
};
function Onboarding({
  firstName,
  lastName,
  emailAddress,
  userId,
}: OnboardingProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const REGISTER_USER = gql`
    mutation RegisterUser(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
      $faculty: String!
      $clerkId: String!
    ) {
      createUser(
        password: $password
        firstName: $firstName
        lastName: $lastName
        email: $email
        facultyCode: $faculty
        clerkId: $clerkId
      )
    }
  `;
  const [registerMutation, { error }] = useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(REGISTER_USER, { fetchPolicy: "network-only" });
  // console.log(error);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: emailAddress,
      password: "password",
      firstName: firstName,
      lastName: lastName,
      faculty: "",
      clerkId: userId,
    },
  });

  const disableSubmitButton = (rForm: typeof form) => {
    const errors = rForm.formState.errors;
    const disable: boolean =
      errors.firstName ||
      errors.lastName ||
      errors.password ||
      errors.email ||
      errors.faculty
        ? true
        : false;

    return disable;
  };

  const onSubmit = async (
    values: z.infer<typeof registerFormSchema>,
  ): Promise<void> => {
    setSubmitting(true);
    console.log(values);

    try {
      await registerMutation({
        variables: {
          password: "password",
          email: emailAddress,
          firstName: firstName,
          lastName: lastName,
          faculty: values.faculty,
          clerkId: userId,
        },
      });

      console.log("user added to db successfully");
      await user?.reload();
      router.push("/");
    } catch (e) {
      toast({
        title: "Error",
        description: "Please try again later",
        variant: "destructive",
      });
      setRegisterError((e as Error).message);
      console.error(registerError);
    } finally {
      setSubmitting(false);
    }
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
              <p>Submit</p>
            )}
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}

export default Onboarding;

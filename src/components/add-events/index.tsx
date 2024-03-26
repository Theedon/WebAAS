"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn, dateWrangler } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {
  CreateEventMutation,
  CreateEventMutationVariables,
} from "./__generated__/index.generated";

import { useState } from "react";

const FormSchema = z.object({
  eventTitle: z
    .string({
      required_error: "event title is required",
    })
    .min(5),
  eventDate: z.date({
    required_error: "event date is required",
  }),
  eventDescription: z
    .string({
      required_error: "event description is required",
    })
    .min(5),
});

function AddEvent({ userId }: { userId: string }) {
  const CREATE_EVENT = gql`
    mutation CreateEvent(
      $title: String!
      $date: String!
      $description: String!
      $creatorId: String!
    ) {
      createEvent(
        title: $title
        date: $date
        description: $description
        creator_id: $creatorId
      )
    }
  `;

  const [createEvent, { error }] = useMutation<
    CreateEventMutation,
    CreateEventMutationVariables
  >(CREATE_EVENT);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [eventSubmitting, setEventSubmitting] = useState<boolean>(false);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setEventSubmitting(true);
    try {
      await createEvent({
        variables: {
          title: data.eventTitle,
          creatorId: userId,
          date: String(data.eventDate),
          description: data.eventDescription,
        },
      });
      toast({
        title: "The event has been created successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-primary p-4">
            <code className="text-primary-foreground">
              {`Event Title: ${data.eventTitle}\nEvent Date: ${dateWrangler(
                data.eventDate,
              )}\nEvent Description: ${data.eventDescription}\n`}
            </code>
          </pre>
        ),
      });
    } catch (error: unknown) {
      console.error("Error creating event:", event);
    } finally {
      setEventSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of event</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date("2050-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Add an event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventTitle"
          render={({ field }) => (
            <FormItem>
              <Input className="w-[240px]" placeholder="title" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventDescription"
          render={({ field }) => (
            <FormItem>
              <Input
                className="w-[240px]"
                placeholder="description."
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={eventSubmitting} type="submit">
          {eventSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <p>Submit</p>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default AddEvent;

"use client";

import { checkUniqueUsernameSchema, registerSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/card-wrapper";
import checkUniqueUsername from "@/actions/checkUniqueUsername";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

export default function RegisterForm() {
  const [userName, setUserName] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    // call the server action

    console.log(values);
  }

  const handleChange = useDebouncedCallback(
    (value: z.infer<typeof checkUniqueUsernameSchema>) =>
      checkUniqueUsername(value),
    1000
  );

  // debounce the function
  // zod should yell if something is wrong with the field on writing
  // show spinner when waiting for response
  // show error | success message of the action

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <CardWrapper
        cardHeading="Join True Feedback"
        cardDescription="Sign up to start your anonymous adventure"
        backLinkLabel="Sign in"
        backLinkHerf="signin"
        backLinkDesc="Already a memeber?"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">UserName</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jhon Doe"
                      {...field}
                      required
                      value={userName}
                      onChange={(e) => {
                        handleChange(e.target.value);
                        // setUserName(e.target.value);
                      }}
                    />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jhondoe@gmail.com"
                      {...field}
                      required
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      {...field}
                      required
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="font-bold w-full">
              Signup
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
}

"use client";

import { registerSchema } from "@/lib/zod";
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
  const [isLoading, setIsLoading] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const handleUsernameChange = useDebouncedCallback(async (value: string) => {
    setIsLoading(true);
    setUsernameMessage(null);

    const response = await checkUniqueUsername(value);

    if (response.error) {
      setUsernameMessage(response.error);
    } else if (response.success) {
      setUsernameMessage(response.success);
    }

    setIsLoading(false);
  }, 1000);

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <CardWrapper
        cardHeading="Join True Feedback"
        cardDescription="Sign up to start your anonymous adventure"
        backLinkLabel="Sign in"
        backLinkHerf="signin"
        backLinkDesc="Already a member?"
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
                      onChange={(e) => {
                        field.onChange(e);
                        handleUsernameChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isLoading && (
                    <p className="text-sm text-gray-500">Checking...</p>
                  )}
                  {usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage.includes("unique")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
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

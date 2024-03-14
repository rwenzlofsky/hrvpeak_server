"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { loginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { login } from "@/actions/login";
import { FormInput } from "@/components/auth/form-input";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {

      
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (!data) return;
          if (!data.success) {
            return toast.error(data.error.message);
          }
          return router.push("/two-factor");
        })
        .catch(() => toast.error("Something went wrong."));
    });
  });

  return (
    <CardWrapper
      headerTitle="Login"
      headerDescription="Please login to your Whoop Account"
      backButtonLabel="Don't have an account? Register"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            
            <div>
              
              <Button
                size="sm"
                variant="link"
                className="-mt-6 p-0 text-xs text-blue-500 w-full justify-end"
                asChild
              >
                <Link href="/reset">Forgot password?</Link>
              </Button>
            </div>
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

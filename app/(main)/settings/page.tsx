"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { loginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const WhoopForm = () => {

  const handleSubmit = () => {
    toast.info("Submit triggered");

  };

  return (
    
      
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            
          </div>
          <Button type="submit"  className="w-full">
            Login Whoop
          </Button>
        </form>
      
  );
  }

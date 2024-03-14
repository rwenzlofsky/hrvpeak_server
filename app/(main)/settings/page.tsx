"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const WhoopForm = () => {

  const handleSubmit = () => {
    toast.info("Submit triggered");

  };

  return (
    
      
        <form onSubmit={handleSubmit} className="space-y-6">
          <Button type="submit"  className="w-full">
            Login Whoop
          </Button>
        </form>
      
  );
  }

import { CredentialsProvider, GoogleProvider, WhoopProvider } from "@/auth/providers";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [CredentialsProvider, GoogleProvider, WhoopProvider],
} satisfies NextAuthConfig;
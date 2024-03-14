import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0"


import bcrypt from "bcryptjs";

export const CredentialsProvider = Credentials({
  async authorize(credentials) {
    const validatedFields = loginSchema.safeParse(credentials);

    if (validatedFields.success) {
      const { email, password } = validatedFields.data;

      const user = await getUserByEmail(email);
      if (!user || !user.password) return null;

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) return user;
    }

    return null;
  },
});


export const GoogleProvider = Google({
  clientId: process.env.GOOGLE_ID as string,
  clientSecret: process.env.GOOGLE_SECRET as string,
  authorization: {
    params: { 
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
});

// Build Whoop Provider

export const WhoopProvider = Auth0Provider({

    id: "whoop",
    name: "whoop",
    client: {
        token_endpoint_auth_method: "client_secret_post",
    },
    issuer: "https://api.prod.whoop.com/oauth/oauth2"
    token: process.env.WHOOP_TOKEN_URL,
    authorization: {
      url: process.env.WHOOP_AUTH_URL,
      params: {
          scope: "offline read:profile read:workout read:recovery read:cycles read:workout read:body_measurement",
      },
    },

    clientId: process.env.WHOOP_CLIENT_ID,
    clientSecret: process.env.WHOOP_CLIENT_SECRET,
    userinfo: process.env.WHOOP_USERINFO_URL,
    profile(profile) {
        return {
            id: profile.user_id,
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: profile.email,

        };
    },
})

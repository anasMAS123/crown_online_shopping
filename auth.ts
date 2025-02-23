import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { USER_BY_ID } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
import { client } from "./sanity/lib/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      const exsitingUser = await client
        .withConfig({ useCdn: false })
        .fetch(USER_BY_ID, {
          id: profile?.sub,
        });
      if (!exsitingUser) {
        await writeClient.create({
          _type: "user",
          id: profile?.sub,
        });
      }

      return true;
    },
    async jwt({ token, profile, account }) {
      if (profile && token) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(USER_BY_ID, { id: profile?.sub });
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });

      return session;
    },
  },
});

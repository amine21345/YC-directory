import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const existingUSer = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: id,
        });
      if (!existingUSer) {
        await writeClient.create({
          _type: "author",
          id: id,
          name: name,
          username: login,
          email: email,
          image: image,
          bio: bio || "",
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        Object.assign(session, {
          id: token.id,
        });
      }
      return session;
    },
  },
});

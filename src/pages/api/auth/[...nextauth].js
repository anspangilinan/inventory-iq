import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../data/models/user";
import dbConnect from "../../../data/db";

export default NextAuth({
  // Enable JSON Web Tokens since we will not store sessions in our DB
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Here we add our login providers - this is where you could add Google or Github SSO as well
  providers: [
    CredentialsProvider({
      name: "credentials",
      // The credentials object is what's used to generate Next Auths default login page - We will not use it however.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Authorize callback is ran upon calling the signin function
      authorize: async (credentials) => {
        dbConnect();

        // Try to find the user and also return the password field
        const user = await User.findOne({ email: credentials.email }).select({
          email: 1,
          password: 1,
          role: 1,
          firstName: 1,
          lastName: 1,
          grade: 1,
          section: 1,
        });

        if (!user) {
          throw new Error("No user with a matching email was found.");
        }

        // Use the comparePassword method we defined in our user.js Model file to authenticate
        const pwValid = await user.comparePassword(credentials.password);

        if (!pwValid) {
          throw new Error("Your password is invalid");
        }

        return user;
      },
    }),
  ],
  // All of this is just to add user information to be accessible for our app in the token/session
  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    // This could be avatars, role, display name, etc...
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          role: user.role,
          grade: user.grade,
          section: user.section,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }
      if (trigger === "update") {
        const newUser = Object.assign({}, token.user, session.user);
        token.user = newUser;
      }
      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    // Here you can define your own custom pages for login, recover password, etc.
    signIn: "/login", // we are going to use a custom login page (we'll create this in just a second)
  },
});

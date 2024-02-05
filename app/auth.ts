import NextAuth from 'next-auth';
// import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  session:{
    strategy:'jwt'
  },
  providers: [
    CredentialsProvider({
      name: "Expense Tracker",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        try{
          const response  = await sql`SELECT * from "user" WHERE email = ${credentials?.email}`;
          const user = response.rows[0]
          console.log({p:user.password,pp: credentials.password});
    
        const passwordCorrect = await bcrypt.compare(
          credentials?.password || '',
          user.password
        );
        console.log(passwordCorrect)
          // console.log(passwordCorrect);
        if(passwordCorrect){
          return {
            id:user.id,
            email:user.email
          }
        }

        }catch(e){
          console.log(e);
        }
          return null
      }
    }),
    // GitHub({
    //   clientId: process.env.OAUTH_CLIENT_KEY as string,
    //   clientSecret: process.env.OAUTH_CLIENT_SECRET as string
    // })
  ],
  pages: {
    signIn: '/sign-in'
  }
});

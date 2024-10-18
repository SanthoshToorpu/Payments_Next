import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                email: { label: "Email", type: "email", placeholder: "user@email.com" },
                password: { label: "Password", type: "password" },
                number: { label: "Phone Number", type: "tel", placeholder: "123-456-7890" },
                mode: { label: "Mode", type: "text", placeholder: "login or signup" },
            },
            async authorize(credentials: any) {
                const { username, email, password, number, mode } = credentials;

                if (mode === "signup") {
                    // Handle sign-up flow
                    const existingUser = await prisma.user.findFirst({ where: { email } });
                    if (existingUser) throw new Error("User already exists with this email");

                    const hashedPassword = await bcrypt.hash(password, 10);
                    const newUser = await prisma.user.create({
                        data: {
                            name: username,
                            email,
                            password: hashedPassword,
                            number,
                        },
                    });

                    return { id: newUser.id.toString(), name: newUser.name, email: newUser.email, number: newUser.number };
                } else if (mode === "login") {
                    // Handle login flow
                    const existingUser = await prisma.user.findFirst({ where: { email: email } });
                    if (!existingUser) throw new Error("No user found with this username");

                    const passwordMatch = await bcrypt.compare(password, existingUser.password);
                    if (!passwordMatch) throw new Error("Invalid password");

                    return { id: existingUser.id.toString(), name: existingUser.name, email: existingUser.email, number: existingUser.number };
                }

                return null;
            },
        }),
        GoogleProvider({
            clientId : process.env.CLIENT_ID || "1061912437463-2316psdvd7p7pfmjeb6rkki3ql3jejhp.apps.googleusercontent.com",
            clientSecret : process.env.CLIENT_SECRET || "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"
        })
    ],
    pages:{
        signIn: "/login",
    },
    secret : "santhosh",
    session : { strategy: "jwt" },
    jwt : { secret: "santhosh" },
};

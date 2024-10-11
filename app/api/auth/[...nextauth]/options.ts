import { AuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/prisma/client';
import { User } from '@prisma/client';

export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { type: 'text' },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                if (
                    credentials?.username === undefined ||
                    credentials?.password === undefined
                ) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credentials.username },
                            { username: credentials.username },
                        ],
                    },
                });

                if (!user) {
                    return null;
                }

                const isPasswordValid = bcrypt.compareSync(
                    credentials.password,
                    user.password,
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                };
            },
        }),
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        session: async ({ session, token }) => {
            const prismaUser = await prisma.user.findUnique({
                where: {
                    id: token.id as string,
                },
            });

            session.user = { ...prismaUser!, password: undefined } as Omit<
                User,
                'password'
            >;

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

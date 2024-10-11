import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { NextAuthProvider } from '@/components/NextAuthProvider';

const openSans = Open_Sans({
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-open-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'devLinks - Share your links with the world',
    description: 'devLinks is a platform to share your links with the world',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${openSans.variable} antialiased`}>
                <NextAuthProvider>
                    <Toaster
                        position="bottom-center"
                        toastOptions={{
                            className:
                                '!bg-gray-800 !text-white !text-xs md:!text-sm !font-normal !px-4 !rounded-[5px]',
                        }}
                    />
                    <main>{children}</main>
                </NextAuthProvider>
            </body>
        </html>
    );
}

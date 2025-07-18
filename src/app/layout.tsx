import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Lin Shi's Resume",
  description: 'Full Stack Web Developer with 10+ years of experience in web development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/resume/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/resume/favicon.svg" />
        <link rel="shortcut icon" href="/resume/favicon.ico" />
      </Head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

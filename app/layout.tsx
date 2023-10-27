import Head from 'next/head';
import Script from 'next/script';
import { Viewport } from 'next';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Notedown',
  description:
    'Write better notes with Notedown, use Markdown and enjoy other features such as sync and even more!',
  keywords: ['Notes', 'Markdown'],
  creator: 'Martínval11',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  other: {
    'apple-touch-icon': '/img/icon-512x512.png',
  },
  alternates: {
    canonical: 'https://notedown-md.vercel.app',
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1A1B1E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <Script src="/static/theme.js" />
      </Head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

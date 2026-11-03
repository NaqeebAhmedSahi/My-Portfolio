import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CustomThemeProvider } from './theme/ThemeProvider';

const poppins = localFont({
  src: [
    { path: './fonts/Poppins-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Poppins-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Poppins-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Poppins-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Poppins-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Naqeeb Ahmed Sahi Portfolio',
  description: 'A beautiful portfolio built with Next.js, Tailwind CSS, and MUI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.className}>
      <body>
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
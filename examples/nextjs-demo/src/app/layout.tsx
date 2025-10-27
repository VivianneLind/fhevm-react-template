import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FHEVM SDK - Comprehensive Demo',
  description: 'Explore the full capabilities of the FHEVM SDK with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}

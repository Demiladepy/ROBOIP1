import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ROBOIP - AI-Powered Motion Capture IP Platform',
  description: 'Turn videos into valuable IP assets. Extract motion data with AI, register on Story Protocol, and earn revenue from licensing. The future of motion capture monetization.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

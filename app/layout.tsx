import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { headers } from 'next/headers' // added
import Web3ModalProvider from '@/context/web3-modal' // added

export const metadata: Metadata = {
  title: 'ROBOIP - AI-Powered Motion Capture IP Platform',
  description: 'Turn videos into valuable IP assets. Extract motion data with AI, register on Story Protocol, and earn revenue from licensing. The future of motion capture monetization.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = headers().get('cookie') // added

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Web3ModalProvider cookies={cookies}>
          <Navbar />
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}

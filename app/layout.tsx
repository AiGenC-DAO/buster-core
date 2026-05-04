import './globals.css';

export const metadata = {
  title: 'Buster Core',
  description: 'Buster Core EAP'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

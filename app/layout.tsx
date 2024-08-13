import SideNav from '../components/sidenav.jsx';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <SideNav />
        {children}
      </body>
    </html>
  );
}

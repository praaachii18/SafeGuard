import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SOSButton from './SOSButton';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <SOSButton />
    </div>
  );
}

export default Layout;
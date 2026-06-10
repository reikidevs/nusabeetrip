import type { Metadata } from 'next';
import AdminShell from './AdminShell';

export const metadata: Metadata = {
  title: 'Admin — NusaBeeTrip',
  robots: { index: false, follow: false },
};

/**
 * Admin layout. The login page renders without the shell (it checks the
 * pathname inside AdminShell), every other admin route gets the sidebar.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}

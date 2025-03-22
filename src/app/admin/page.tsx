import { Metadata } from 'next';
import Link from 'next/link';
import RefreshAllPreviewsButton from '@/components/RefreshAllPreviewsButton';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Portfolio',
  description: 'Admin dashboard for portfolio management',
};

export default function AdminPage() {
  return (
    <main className="container max-w-5xl py-10 px-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Site Preview Management</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Use this panel to manage site preview images for your projects. You can refresh all previews at once,
            which will capture fresh screenshots of your project demo sites.
          </p>
          
          <RefreshAllPreviewsButton />
        </div>
      </div>
    </main>
  );
} 
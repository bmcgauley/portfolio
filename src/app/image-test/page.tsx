import Image from 'next/image';
import Link from 'next/link';

export default function ImageTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Image Test Page</h1>
      <p className="mb-4">This page tests different ways of loading images to diagnose issues:</p>
      
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">1. Profile Image with Next Image component (unoptimized)</h2>
        <div className="w-64 h-64 relative mb-2">
          <Image 
            src="/images/profile/DSC07056-2.jpg"
            alt="Profile Test" 
            fill 
            className="object-cover rounded"
            unoptimized
          />
        </div>
        <p className="text-sm text-gray-600">Path: /images/profile/DSC07056-2.jpg (unoptimized)</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">2. Regular IMG tag</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/profile/DSC07056-2.jpg" 
          alt="Profile Regular IMG" 
          className="w-64 h-64 object-cover rounded mb-2"
        />
        <p className="text-sm text-gray-600">Path: /images/profile/DSC07056-2.jpg (regular IMG tag)</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">3. Placeholder image with Next Image</h2>
        <div className="w-64 h-64 relative mb-2">
          <Image 
            src="/images/placeholders/site-preview-placeholder.jpg"
            alt="Placeholder Test" 
            fill 
            className="object-cover rounded"
          />
        </div>
        <p className="text-sm text-gray-600">Path: /images/placeholders/site-preview-placeholder.jpg</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">4. Public path test</h2>
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-10 w-auto" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/next.svg" alt="Next.js Logo" className="h-10 w-auto" />
        </div>
        <p className="text-sm text-gray-600">Testing if public root SVGs load correctly</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">5. Direct External Placeholder</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://placehold.co/400x400/3b82f6/ffffff?text=Fallback+Image" 
          alt="Fallback Placeholder" 
          className="w-64 h-64 object-cover rounded mb-2"
        />
        <p className="text-sm text-gray-600">External placeholder (should always work)</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">6. Debug API</h2>
        <div className="flex flex-col">
          <Link href="/api/debug-images" className="text-blue-600 underline mb-2">Check image paths</Link>
          <p className="text-sm text-gray-600">Click to view details about image files on the server</p>
        </div>
      </div>

      <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
    </div>
  );
} 
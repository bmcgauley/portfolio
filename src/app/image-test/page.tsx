import Image from 'next/image';
import Link from 'next/link';
import profileImage from '../../assets/images/profile/DSC07056-2.jpg';
// For SVGs, we'll still use public paths since they're not in assets
const vercelLogo = '/vercel.svg';
const nextLogo = '/next.svg';

export default function ImageTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Image Test Page</h1>
      <p className="mb-4">This page tests different ways of loading images to diagnose issues:</p>
      
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">1. Profile Image with Next Image component (imported from assets)</h2>
        <div className="w-64 h-64 relative mb-2">
          <Image 
            src={profileImage}
            alt="Profile Test" 
            fill 
            className="object-cover rounded"
            unoptimized
          />
        </div>
        <p className="text-sm text-gray-600">Imported path: @/assets/images/profile/DSC07056-2.jpg</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">2. Regular IMG tag with imported image</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={profileImage.src} 
          alt="Profile Regular IMG" 
          className="w-64 h-64 object-cover rounded mb-2"
        />
        <p className="text-sm text-gray-600">Using .src property of imported image</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">3. Placeholder image with Next Image</h2>
        <div className="w-64 h-64 relative mb-2">
          <Image 
            src={profileImage}
            alt="Placeholder Test" 
            fill 
            className="object-cover rounded"
          />
        </div>
        <p className="text-sm text-gray-600">Imported path: @/assets/images/profile/DSC07056-2.jpg</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">4. Public path test (now using imports)</h2>
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={vercelLogo} alt="Vercel Logo" className="h-10 w-auto" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={nextLogo} alt="Next.js Logo" className="h-10 w-auto" />
        </div>
        <p className="text-sm text-gray-600">Testing if imported SVGs load correctly</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">5. Fallback Placeholder</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={profileImage.src} 
          alt="Fallback Placeholder" 
          className="w-64 h-64 object-cover rounded mb-2"
        />
        <p className="text-sm text-gray-600">Using profile image as fallback</p>
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
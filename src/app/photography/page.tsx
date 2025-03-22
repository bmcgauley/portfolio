import { photoCollections } from "@/lib/data";
import PhotoCollectionCard from "@/components/PhotoCollectionCard";

export default function PhotographyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Photography</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my photography collections, capturing moments and telling stories through images.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {photoCollections.map((collection) => (
            <PhotoCollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  );
} 
import Image from 'next/image';
import Link from 'next/link';
import { PhotoCollection } from '@/lib/types';

interface PhotoCollectionCardProps {
  collection: PhotoCollection;
}

const PhotoCollectionCard = ({ collection }: PhotoCollectionCardProps) => {
  return (
    <Link 
      href={`/photography/${collection.id}`}
      className="group block"
    >
      <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
        <Image 
          src={collection.coverImage}
          alt={collection.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
          <h3 className="text-white text-xl font-semibold mb-1">{collection.title}</h3>
          <p className="text-gray-200 text-sm line-clamp-2">
            {collection.description}
          </p>
          <p className="text-gray-300 text-xs mt-2">
            {collection.images.length} photos
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCollectionCard; 
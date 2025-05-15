import Image from 'next/image';
import Link from 'next/link';
import { PhotoCollection } from '@/lib/types';

interface PhotoCollectionCardProps {
  collection: PhotoCollection;
}

const PhotoCollectionCard = ({ collection }: PhotoCollectionCardProps) => {
  return (    <Link 
      href={`/photography/${collection.id}`}
      className="group block"
    >
      <div className="relative h-64 overflow-hidden rounded-lg shadow-md border border-transparent transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30">
        <Image 
          src={collection.coverImage}
          alt={collection.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5 transition-opacity group-hover:from-black/80">
          {/* Blue and gold gradient overlay on hover */}
          <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <h3 className="text-white text-xl font-semibold mb-1 relative">{collection.title}</h3>
          <p className="text-gray-200 text-sm line-clamp-2 relative">
            {collection.description}
          </p>
          <div className="flex items-center justify-between mt-3 relative">
            <p className="text-gray-300 text-xs">
              {collection.images.length} photos
            </p>
            <span className="text-secondary text-xs font-medium opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
              View Collection →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCollectionCard; 
import React, { useState } from 'react';
import Image from 'next/image';

export default function OutfitCard({ image, brand, color, size, category }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-full relative cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front - Image */}
        <div className="absolute w-full h-full backface-hidden">
          <Image 
            src={image} 
            alt="Outfit item"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Back - Information */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg p-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-xl font-semibold text-[#4C2B08]">Details</h3>
            <div className="space-y-1">
              <p><span className="font-medium">Marke:</span> {brand}</p>
              <p><span className="font-medium">Farbe:</span> {color}</p>
              <p><span className="font-medium">Größe:</span> {size}</p>
              <p><span className="font-medium">Kategorie:</span> {category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
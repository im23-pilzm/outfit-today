"use client"
import React, { useState, useEffect } from 'react';

const CreateOutfitPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [clothingPieces, setClothingPieces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClothingPieces = async () => {
            try {
                const response = await fetch("/api/createOutfit");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setClothingPieces(data);
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchClothingPieces();
    }, [])

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredClothingPieces = selectedCategory
        ? clothingPieces.filter(piece => piece.category === selectedCategory)
        : [];

    console.log('Selected category:', selectedCategory);
    console.log("Filtered pieces:", filteredClothingPieces);

    return (
        <>
            <div className="min-h-screen bg-[var(--background) flex">
                <div className="container px-4 py-8 space-y-12 w-1/4 ml-18">
                    <div className="flex justify-start items-center gap-8">
                        <div className="h-[150px] aspect-square rounded-lg border-2 border-solid border-[#4C2B08]">
                            <button
                                onClick={() => handleCategorySelect("HEADWEAR")}
                                className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                            >
                                Caps
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-8">
                        <div className="h-[150px] aspect-square rounded-lg border-2 border-solid border-[#4C2B08]">
                            <button
                                onClick={() => handleCategorySelect("TOP")}
                                className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                            >
                                Oberteile
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-8">
                        <div className="h-[150px] aspect-square rounded-lg border-2 border-solid border-[#4C2B08]">
                            <button
                                onClick={() => handleCategorySelect("BOTTOM")}
                                className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                            >
                                Hosen
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-8">
                        <div className="h-[150px] aspect-square rounded-lg border-2 border-solid border-[#4C2B08]">
                            <button
                                onClick={() => handleCategorySelect("SHOES")}
                                className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                            >
                                Schuhe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-1/4">
                    Outfit
                </div>

                <div className="w-1/4 flex">
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!isLoading && !error && filteredClothingPieces.map(piece => (
                        <div key={piece.id} className="mb-4 p-4 h-[150px] aspect-square rounded-lg border-2 border-solid border-[#4C2B08] overflow-hidden">
                            {piece.image && (
                                <img
                                    src={piece.image}
                                    alt={piece.name}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
};

export default CreateOutfitPage;
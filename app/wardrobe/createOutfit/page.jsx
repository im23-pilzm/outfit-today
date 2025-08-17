"use client"
import { button } from 'motion/react-client';
import React, { useState, useEffect } from 'react';

const CreateOutfitPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOutfit, setSelectedOutfit] = useState([])
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

    const handleSelectPiece = (piece) => {
        setSelectedOutfit(prevOutfit => {
            const filteredOutfit = prevOutfit.filter(item => item.category !== piece.category);
            return [...filteredOutfit, piece]
        })
    }

    const filteredClothingPieces = selectedCategory
        ? clothingPieces.filter(piece => piece.category === selectedCategory)
        : [];

    console.log('Selected category:', selectedCategory);
    console.log("Filtered pieces:", filteredClothingPieces);
    console.log('Selected outfit:', selectedOutfit);

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
                <div className="w-1/4 flex flex-col gap-4 px-4 py-8">
                    <h2 className="text-xl font-bold text-[#4C2B08]">Selected Outfit</h2>
                    {["HEADWEAR", "TOP", "BOTTOM", "SHOES"].map(category => {
                        const selectedPiece = selectedOutfit.find(piece => piece.category === category);
                        return (
                            <div key={category} className="h-[150px] aspect-square overflow-hidden">
                                {selectedPiece ? (
                                    <img
                                        src={selectedPiece.image}
                                        alt={selectedPiece.name}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#4C2B08]/50">
                                        {category}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="w-1/4 flex flex-wrap gap-4 content-start px-4 py-8">
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!isLoading && !error && filteredClothingPieces.map(piece => (
                        <div
                            key={piece.id}
                            className="p-4 h-[150px] aspect-square rounded-lg border-2 border-solid border-[#4C2B08] overflow-hidden"
                            onClick={() => handleSelectPiece(piece)}
                        >
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
"use client"
import React, { useState } from 'react';
import { Plus } from 'react-feather';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import OutfitCard from '../../components/OutfitCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import AddOutfitModal from '../../components/AddOutfitModal';

export default function MyWardrobePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectCategory] = useState(null);
    const [clothingPieces, setClothingPieces] = useState({
        headwear: [],
        top: [],
        bottom: [],
        shoes: []
    })

    const handleAddOutfit = (category) => {
        setSelectCategory(category);
        setIsModalOpen(true);
    };

    const handleNewClothingPiece = (newPiece) => {
        setClothingPieces(prev => ({
            ...prev,
            [newPiece.category.toLowerCase()]: [...prev[newPiece.category.toLowerCase()], newPiece]
        }));
    };



    return (
        <>
            <div className="min-h-screen bg-[var(--background)">
                <div className="container mx-auto px-4 py-8 space-y-12">
                    {/* Headwear section */}
                    <div className="flex justify-start items-center gap-8">
                        <p className="min-w-[120px] text-left font-medium text-[#4C2B08] flex items-center justify-start h-full my-auto">
                            Kopfbedeckung
                        </p>
                        <Swiper
                            navigation={true}
                            modules={[Navigation]}
                            className="w-[70%]"
                            spaceBetween={30}
                            slidesPerView={3}
                            style={{ height: '300px' }}
                        >
                            {clothingPieces.headwear.map((piece, index) => (
                                <SwiperSlide key={piece.id} className="aspect-square bg-gray-100 rounded-lg">
                                    <OutfitCard {...piece} />
                                </SwiperSlide>
                            ))}
                            <SwiperSlide className="aspect-square rounded-lg border-2 border-dashed border-[#4C2B08]">
                                <button
                                    onClick={() => handleAddOutfit('HEADWEAR')}
                                    className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                                >
                                    <Plus size={48} />
                                    <span className="text-xl font-semibold mt-2">Neues Outfit</span>
                                </button>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    {/* Top section */}
                    <div className="flex justify-start items-center gap-8">
                        <p className="min-w-[120px] text-left font-medium text-[#4C2B08] flex items-center justify-start h-full my-auto">
                            Oberteile
                        </p>
                        <Swiper
                            navigation={true}
                            modules={[Navigation]}
                            className="w-[70%]"
                            spaceBetween={30}
                            slidesPerView={3}
                            style={{ height: '300px' }}
                        >
                            {clothingPieces.top.map((piece, index) => (
                                <SwiperSlide key={piece.id} className="aspect-square bg-gray-100 rounded-lg">
                                    <OutfitCard {...piece} />
                                </SwiperSlide>
                            ))}
                            <SwiperSlide className="aspect-square rounded-lg border-2 border-dashed border-[#4C2B08]">
                                <button
                                    onClick={() => handleAddOutfit('TOP')}
                                    className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                                >
                                    <Plus size={48} />
                                    <span className="text-xl font-semibold mt-2">Neues Outfit</span>
                                </button>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    {/* Bottom section */}
                    <div className="flex justify-start items-center gap-8">
                        <p className="min-w-[120px] text-left font-medium text-[#4C2B08] flex items-center justify-start h-full my-auto">
                            Hosen
                        </p>
                        <Swiper
                            navigation={true}
                            modules={[Navigation]}
                            className="w-[70%]"
                            spaceBetween={30}
                            slidesPerView={3}
                            style={{ height: '300px' }}
                        >
                            {clothingPieces.bottom.map((piece, index) => (
                                <SwiperSlide key={piece.id} className="aspect-square bg-gray-100 rounded-lg">
                                    <OutfitCard {...piece} />
                                </SwiperSlide>
                            ))}
                            <SwiperSlide className="aspect-square rounded-lg border-2 border-dashed border-[#4C2B08]">
                                <button
                                    onClick={() => handleAddOutfit('BOTTOM')}
                                    className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                                >
                                    <Plus size={48} />
                                    <span className="text-xl font-semibold mt-2">Neues Outfit</span>
                                </button>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    {/* Shoes section */}
                    <div className="flex justify-start items-center gap-8">
                        <p className="min-w-[120px] text-left font-medium text-[#4C2B08] flex items-center justify-start h-full my-auto">
                            Schuhe
                        </p>
                        <Swiper
                            navigation={true}
                            modules={[Navigation]}
                            className="w-[70%]"
                            spaceBetween={30}
                            slidesPerView={3}
                            style={{ height: '300px' }}
                        >
                            {clothingPieces.shoes.map((piece, index) => (
                                <SwiperSlide key={piece.id} className="aspect-square bg-gray-100 rounded-lg">
                                    <OutfitCard {...piece} />
                                </SwiperSlide>
                            ))}
                            <SwiperSlide className="aspect-square rounded-lg border-2 border-dashed border-[#4C2B08]">
                                <button
                                    onClick={() => handleAddOutfit('SHOES')}
                                    className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                                >
                                    <Plus size={48} />
                                    <span className="text-xl font-semibold mt-2">Neues Outfit</span>
                                </button>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <AddOutfitModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        category={selectedCategory}
                        onAdd={handleNewClothingPiece}
                    />
                </div>
            </div>
        </>
    );
}
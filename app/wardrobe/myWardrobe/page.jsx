"use client"
import React, { useRef, useState } from 'react';
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

    const handleAddOutfit = (category) => {
        setSelectCategory(category);
        setIsModalOpen(true);
    };

    const sampleOutfit = {
        image: "/tshirt.png",
        brand: "Nike",
        color: "Schwarz",
        size: "M",
        category: "Oberteile"
    };


    return (
        <>
            <div className="container mx-auto px-4 py-8 flex-col space-y-12">
                <h1 className="text-4xl font-bold text-[#4C2B08] mb-8">Mein Kleiderschrank</h1>
                <div className="flex justify-start items-center gap-8">
                    <p className="min-w-[120px] text-left font-medium text-[#4C2B08] flex items-center justify-start h-full my-auto">Kopfbedeckung</p>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="w-[70%]"
                        spaceBetween={30}
                        slidesPerView={3}
                        style={{ height: 'auto' }}
                    >
                        <SwiperSlide className="aspect-square bg-gray-100 rounded-lg">
                            <OutfitCard {...sampleOutfit} />
                        </SwiperSlide>
                        <SwiperSlide className="aspect-square bg-gray-100 rounded-lg">
                            <OutfitCard {...sampleOutfit} />
                        </SwiperSlide>
                        <SwiperSlide className="aspect-square rounded-lg border-2 border-dashed border-[#4C2B08]">
                            <button
                                onClick={() => handleAddOutfit('headwear')}
                                className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                            >
                                <Plus size={48} />
                                <span className="text-xl font-semibold mt-2">Neues Outfit</span>
                            </button>
                        </SwiperSlide>
                        {/* Repeat for other slides with the same structure */}
                    </Swiper>
                </div>
                <div className="flex justify-start items-center gap-8">
                    <p className="min-w-[120px] text-left font-medium text-[#4C2B08] flex items-center justify-start h-full my-auto">Oberteile</p>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="w-[70%]"
                        spaceBetween={30}
                        slidesPerView={3}
                        style={{ height: 'auto' }}
                    >
                        <SwiperSlide className="aspect-square bg-gray-100 rounded-lg">
                            <OutfitCard {...sampleOutfit} />
                        </SwiperSlide>
                        <SwiperSlide className="aspect-square bg-gray-100 rounded-lg">
                            <OutfitCard {...sampleOutfit} />
                        </SwiperSlide>
                        <SwiperSlide className="aspect-square rounded-lg border-2 border-dashed border-[#4C2B08]">
                            <button
                                onClick={() => handleAddOutfit('top')}
                                className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                            >
                                <Plus size={48} />
                                <span className="text-xl font-semibold mt-2">Neues Outfit</span>
                            </button>
                        </SwiperSlide>
                        {/* Repeat for other slides with the same structure */}
                    </Swiper>
                </div>
                <div className="flex justify-start items-center gap-8">
                    <p className="min-w-[120px] text-left font-medium text-[#4C2B08] flex items-center justify-start h-full my-auto">Hosen</p>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="w-[70%]"
                        spaceBetween={30}
                        slidesPerView={3}
                        style={{ height: 'auto' }}
                    >
                        <SwiperSlide className="aspect-square bg-gray-100 rounded-lg">
                            <OutfitCard {...sampleOutfit} />
                        </SwiperSlide>
                        <SwiperSlide className="aspect-square bg-gray-100 rounded-lg">
                            <OutfitCard {...sampleOutfit} />
                        </SwiperSlide>
                        <SwiperSlide className="aspect-square rounded-lg border-2 border-dashed border-[#4C2B08]">
                            <button
                                onClick={() => handleAddOutfit('bottom')}
                                className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                            >
                                <Plus size={48} />
                                <span className="text-xl font-semibold mt-2">Neues Outfit</span>
                            </button>
                        </SwiperSlide>
                        {/* Repeat for other slides with the same structure */}
                    </Swiper>
                </div>
                <div className="flex justify-start items-center gap-8">
                    <p className="min-w-[120px] text-left font-medium text-[#4C2B08] flex items-center justify-start h-full my-auto">Schuhe</p>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="w-[70%]"
                        spaceBetween={30}
                        slidesPerView={3}
                        style={{ height: 'auto' }}
                    >
                        <SwiperSlide className="aspect-square bg-gray-100 rounded-lg">
                            <OutfitCard {...sampleOutfit} />
                        </SwiperSlide>
                        <SwiperSlide className="aspect-square bg-gray-100 rounded-lg">
                            <OutfitCard {...sampleOutfit} />
                        </SwiperSlide>
                        <SwiperSlide className="aspect-square rounded-lg border-2 border-dashed border-[#4C2B08]">
                            <button
                                onClick={() => handleAddOutfit('shoes')}
                                className="w-full h-full flex flex-col justify-center items-center text-[#4C2B08] hover:bg-[#4C2B08]/5 transition-colors duration-200"
                            >
                                <Plus size={48} />
                                <span className="text-xl font-semibold mt-2">Neues Outfit</span>
                            </button>
                        </SwiperSlide>
                        {/* Repeat for other slides with the same structure */}
                    </Swiper>
                </div>
            </div>
            <AddOutfitModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={selectedCategory}
            />
        </>
    );
}
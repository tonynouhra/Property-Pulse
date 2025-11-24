'use client';
import Image from 'next/image';
import { useState } from 'react';

const PropertyImages = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openPreview = (index) => {
        setCurrentIndex(index);
        setSelectedImage(images[index]);
    };

    const closePreview = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
    };

    const prevImage = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="w-full h-64 relative cursor-pointer hover:opacity-90 transition"
                        onClick={() => openPreview(index)}
                    >
                        <Image
                            src={src}
                            alt={`Property Image ${index + 1}`}
                            sizes='100vw'
                            fill
                            className="object-cover rounded-lg"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0  bg-black/20 z-50 flex items-center justify-center p-4"
                    onClick={closePreview}
                >
                    {/* Modal Container */}
                    <div
                        className="relative bg-white/10 backdrop-blur-sm  rounded-2xl p-6 shadow-2xl max-w-3xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closePreview}
                            className="absolute -top-2 -right-2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-lg z-10"
                        >
                            ×
                        </button>

                        {/* Previous Button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10"
                            >
                                ‹
                            </button>
                        )}

                        {/* Image */}
                        <div className="relative w-full h-[60vh] rounded-lg overflow-hidden">
                            <Image
                                src={selectedImage}
                                alt={`Property Image ${currentIndex + 1}`}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Next Button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10"
                            >
                                ›
                            </button>
                        )}

                        {/* Image Counter */}
                        <div className="mt-4 text-center text-white font-medium">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyImages;
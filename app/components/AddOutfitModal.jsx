import React, { useState } from 'react';

export default function AddOutfitModal({ isOpen, onClose, category }) {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        color: '',
        size: '',
        image: null
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const submissionData = new FormData();
            submissionData.append("name", formData.name);
            submissionData.append("brand", formData.brand);
            submissionData.append("color", formData.color);
            submissionData.append("size", formData.size);
            submissionData.append("category", category);

            if (formData.image instanceof File) {
                submissionData.append('image', formData.image);
            }

            const response = await fetch("/api/wardrobe", {
                method: "POST",
                body: submissionData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add item")
            }

            setFormData({
                name: "",
                brand: "",
                color: "",
                size: "",
                image: null,
            });
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }


    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-96">
                <h2 className="text-2xl font-bold text-[#4C2B08] mb-4">Add New {category}</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4C2B08] focus:ring-[#4C2B08]"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Brand</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4C2B08] focus:ring-[#4C2B08]"
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Color</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4C2B08] focus:ring-[#4C2B08]"
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Size</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4C2B08] focus:ring-[#4C2B08]"
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-[#4C2B08] text-white rounded-md hover:bg-[#3A2006]"
                        >
                            {isLoading ? 'Adding...' : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
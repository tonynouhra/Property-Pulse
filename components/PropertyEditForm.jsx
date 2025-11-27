'use client';
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const AMENITIES = [
    'Wifi',
    'Full Kitchen',
    'Washer & Dryer',
    'Free Parking',
    'Swimming Pool',
    'Hot Tub',
    '24/7 Security',
    'Wheelchair Accessible',
    'Elevator Access',
    'Dishwasher',
    'Gym/Fitness Center',
    'Air Conditioning',
    'Balcony/Patio',
    'Smart TV',
    'Coffee Maker'
];

// Rate types - add or remove rate types here
const RATE_TYPES = [
    {label: 'Weekly', key: 'weekly'},
    {label: 'Monthly', key: 'monthly'},
    {label: 'Nightly', key: 'nightly'}
];

// Location fields - add or remove location fields here
const LOCATION_FIELDS = [
    {id: 'street', name: 'location.street', placeholder: 'Street', required: false},
    {id: 'city', name: 'location.city', placeholder: 'City', required: true},
    {id: 'state', name: 'location.state', placeholder: 'State', required: true},
    {id: 'zipcode', name: 'location.zipcode', placeholder: 'Zipcode', required: false}
];

// Seller info fields - add or remove seller info fields here
const SELLER_INFO_FIELDS = [
    {
        id: 'seller_name',
        label: 'Seller Name',
        name: 'seller_info.name',
        type: 'text',
        placeholder: 'Name',
        required: false
    },
    {
        id: 'seller_email',
        label: 'Seller Email',
        name: 'seller_info.email',
        type: 'email',
        placeholder: 'Email address',
        required: true
    },
    {
        id: 'seller_phone',
        label: 'Seller Phone',
        name: 'seller_info.phone',
        type: 'tel',
        placeholder: 'Phone',
        required: false
    }
];

const PropertyEditForm = ({propertyId}) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    const [fields, setFields] = useState({
        type: '',
        name: '',
        description: '',
        location: {
            street: '',
            city: '',
            state: '',
            zipcode: ''
        },
        beds: '',
        baths: '',
        square_feet: '',
        amenities: [],
        rates: {
            weekly: '',
            monthly: '',
            nightly: ''
        },
        seller_info: {
            name: '',
            email: '',
            phone: ''
        }
    });

    useEffect(() => {
        setMounted(true);

        // Fetch property data
        const fetchProperty = async () => {
            try {
                const response = await fetch(`/api/properties/${propertyId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch property');
                }

                const data = await response.json();
                const property = data.property;

                // Set form fields
                setFields({
                    type: property.type || '',
                    name: property.name || '',
                    description: property.description || '',
                    location: {
                        street: property.location?.street || '',
                        city: property.location?.city || '',
                        state: property.location?.state || '',
                        zipcode: property.location?.zip || ''
                    },
                    beds: property.beds || '',
                    baths: property.baths || '',
                    square_feet: property.square_feet || '',
                    amenities: property.amenities || [],
                    rates: {
                        weekly: property.rates?.weekly || '',
                        monthly: property.rates?.monthly || '',
                        nightly: property.rates?.nightly || ''
                    },
                    seller_info: {
                        name: property.seller_info?.name || '',
                        email: property.seller_info?.email || '',
                        phone: property.seller_info?.phone || ''
                    }
                });

                // Set existing images
                setExistingImages(property.images || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching property:', error);
                toast.error('Failed to load property data');
                setLoading(false);
            }
        };

        if (propertyId) {
            fetchProperty();
        }
    }, [propertyId]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        // Handle nested fields
        if (name.includes('.')) {
            const [outerkey, innerkey] = name.split('.');
            console.log(outerkey, innerkey);
            setFields((prevFields) => ({
                ...prevFields,
                [outerkey]: {
                    ...prevFields[outerkey],
                    [innerkey]: value
                }
            }));
        } else {
            setFields((prevFields) => ({
                ...prevFields,
                [name]: value
            }));
        }
    }

    const handleAmenitiesChangeChange = (e) => {
        const {value, checked} = e.target;
        // clone current array
        let updatedAmenities = [...fields.amenities];
        if (checked) {
            // add amenity
            updatedAmenities.push(value);
        } else {
            // remove amenity
            const index = updatedAmenities.indexOf(value);
            if (index > -1) {
                updatedAmenities.splice(index, 1);
            }
        }
        // update state
        setFields((prevFields) => ({
            ...prevFields,
            amenities: updatedAmenities
        }));
    }


    const handleNewImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(prevImages => [...prevImages, ...files]);
    }

    const removeExistingImage = (imageUrl) => {
        setExistingImages(prevImages => prevImages.filter(url => url !== imageUrl));
    }

    const removeNewImage = (index) => {
        setNewImages(prevImages => prevImages.filter((_, i) => i !== index));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Add all fields to FormData
            formData.append('type', fields.type);
            formData.append('name', fields.name);
            formData.append('description', fields.description);

            // Add location fields
            formData.append('location.street', fields.location.street);
            formData.append('location.city', fields.location.city);
            formData.append('location.state', fields.location.state);
            formData.append('location.zipcode', fields.location.zipcode);

            // Add property details
            formData.append('beds', fields.beds);
            formData.append('baths', fields.baths);
            formData.append('square_feet', fields.square_feet);

            // Add amenities
            fields.amenities.forEach((amenity) => {
                formData.append('amenities', amenity);
            });

            // Add rates
            formData.append('rates.weekly', fields.rates.weekly);
            formData.append('rates.monthly', fields.rates.monthly);
            formData.append('rates.nightly', fields.rates.nightly);

            // Add seller info
            formData.append('seller_info.name', fields.seller_info.name);
            formData.append('seller_info.email', fields.seller_info.email);
            formData.append('seller_info.phone', fields.seller_info.phone);

            // Add existing images (URLs that weren't deleted)
            existingImages.forEach((imageUrl) => {
                formData.append('existingImages', imageUrl);
            });

            // Add new images (File objects)
            newImages.forEach((image) => {
                formData.append('images', image);
            });

            const response = await fetch(`/api/properties/${propertyId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Property updated successfully!');
                // Redirect to the updated property page
                router.push(`/properties/${data.property._id}`);
            } else {
                const error = await response.json();
                console.error('Error:', error);
                toast.error(error.message || 'Failed to update property');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred while updating the property');
        }
    }


    if (!mounted || loading) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600">Loading property data...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">
                Edit Property
            </h2>

                <div className="mb-4">
                    <label
                        htmlFor="type"
                        className="block text-gray-700 font-bold mb-2"
                    >Property Type</label
                    >
                    <select
                        id="type"
                        name="type"
                        className="border rounded w-full py-2 px-3"
                        required
                        value={fields.type}
                        onChange={handleChange}
                    >
                        <option value="">Select Property Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Condo">Condo</option>
                        <option value="House">House</option>
                        <option value="Cabin Or Cottage">Cabin or Cottage</option>
                        <option value="Room">Room</option>
                        <option value="Studio">Studio</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2"
                    >Listing Name</label
                    >
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="eg. Beautiful Apartment In Miami"
                        required
                        value={fields.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 font-bold mb-2"
                    >Description</label
                    >
                    <textarea
                        id="description"
                        name="description"
                        className="border rounded w-full py-2 px-3"
                        rows="4"
                        placeholder="Add an optional description of your property"
                        value={fields.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-4 bg-blue-50 p-4">
                    <label className="block text-gray-700 font-bold mb-2">Location</label>
                    {LOCATION_FIELDS.map((field) => (
                        <input
                            key={field.id}
                            type="text"
                            id={field.id}
                            name={field.name}
                            className="border rounded w-full py-2 px-3 mb-2"
                            placeholder={field.placeholder}
                            required={field.required}
                            value={fields.location[field.id]}
                            onChange={handleChange}
                        />
                    ))}
                </div>

                <div className="mb-4 flex flex-wrap">
                    <div className="w-full sm:w-1/3 pr-2">
                        <label htmlFor="beds" className="block text-gray-700 font-bold mb-2"
                        >Beds</label
                        >
                        <input
                            type="number"
                            id="beds"
                            name="beds"
                            className="border rounded w-full py-2 px-3"
                            required
                            value={fields.beds}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full sm:w-1/3 pr-2">
                        <label htmlFor="baths" className="block text-gray-700 font-bold mb-2"
                        >Baths</label
                        >
                        <input
                            type="number"
                            id="baths"
                            name="baths"
                            className="border rounded w-full py-2 px-3"
                            required
                            value={fields.baths}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full sm:w-1/3 pr-2">
                        <label
                            htmlFor="square_feet"
                            className="block text-gray-700 font-bold mb-2"
                        >Square Feet</label
                        >
                        <input
                            type="number"
                            id="square_feet"
                            name="square_feet"
                            className="border rounded w-full py-2 px-3"
                            required
                            value={fields.square_feet}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2"
                    >Amenities</label
                    >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {AMENITIES.map((amenity) => (
                            <div key={amenity}>
                                <input
                                    type="checkbox"
                                    id={`amenity_${amenity.toLowerCase().replace(/[\s/]/g, '_')}`}
                                    name="amenities"
                                    value={amenity}
                                    className="mr-2"
                                    checked={fields.amenities.includes(amenity)}
                                    onChange={handleAmenitiesChangeChange}
                                />
                                <label htmlFor={`amenity_${amenity.toLowerCase().replace(/[\s/]/g, '_')}`}>
                                    {amenity}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4 bg-blue-50 p-4">
                    <label className="block text-gray-700 font-bold mb-2"
                    >Rates (Leave blank if not applicable)</label
                    >
                    <div
                        className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                        {RATE_TYPES.map((rate) => (
                            <div key={rate.key} className="flex items-center">
                                <label htmlFor={`${rate.key}_rate`} className="mr-2">
                                    {rate.label}
                                </label>
                                <input
                                    type="number"
                                    id={`${rate.key}_rate`}
                                    name={`rates.${rate.key}`}
                                    className="border rounded w-full py-2 px-3"
                                    onChange={handleChange}
                                    value={fields.rates[rate.key]}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {SELLER_INFO_FIELDS.map((field) => (
                    <div key={field.id} className="mb-4">
                        <label
                            htmlFor={field.id}
                            className="block text-gray-700 font-bold mb-2"
                        >{field.label}</label>
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.name}
                            className="border rounded w-full py-2 px-3"
                            placeholder={field.placeholder}
                            required={field.required}
                            value={fields.seller_info[field.id.split('_')[1]]}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Property Images
                    </label>

                    {/* Display existing images */}
                    {existingImages.length > 0 && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Current Images:</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {existingImages.map((imageUrl, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={imageUrl}
                                            alt={`Property ${index + 1}`}
                                            className="w-full h-32 object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(imageUrl)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Display new images preview */}
                    {newImages.length > 0 && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">New Images to Upload:</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {newImages.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`New ${index + 1}`}
                                            className="w-full h-32 object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add new images input */}
                    <div>
                        <label htmlFor="new-images" className="text-sm text-gray-600 mb-2">
                            Add More Images (up to 4 total)
                        </label>
                        <input
                            type="file"
                            id="new-images"
                            name="new-images"
                            className="border rounded w-full py-2 px-3"
                            accept="image/*"
                            multiple
                            onChange={handleNewImageChange}
                        />
                    </div>
                </div>

            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Update Property
                </button>
            </div>
        </form>
    );
}

export default PropertyEditForm;
'use client';
import {useState, useEffect} from "react";

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
    { label: 'Weekly', key: 'weekly' },
    { label: 'Monthly', key: 'monthly' },
    { label: 'Nightly', key: 'nightly' }
];

// Location fields - add or remove location fields here
const LOCATION_FIELDS = [
    { id: 'street', name: 'location.street', placeholder: 'Street', required: false },
    { id: 'city', name: 'location.city', placeholder: 'City', required: true },
    { id: 'state', name: 'location.state', placeholder: 'State', required: true },
    { id: 'zipcode', name: 'location.zipcode', placeholder: 'Zipcode', required: false }
];

// Seller info fields - add or remove seller info fields here
const SELLER_INFO_FIELDS = [
    { id: 'seller_name', label: 'Seller Name', name: 'seller_info.name', type: 'text', placeholder: 'Name', required: false },
    { id: 'seller_email', label: 'Seller Email', name: 'seller_info.email', type: 'email', placeholder: 'Email address', required: true },
    { id: 'seller_phone', label: 'Seller Phone', name: 'seller_info.phone', type: 'tel', placeholder: 'Phone', required: false }
];

const PropertyAddForm = () => {
    const [mounted, setMounted] = useState(false);
    // to test form state
    const[fields,setFields]=useState({
        type: 'Appartment',
        name:'Test Property',
        description:'This is a test property description.',
        location:{
            street:'123 Main St',
            city:'Test City',
            state:'TS',
            zipcode:'12345'
        },
        beds:'2',
        baths:'1',
        square_feet:'850',
        amenities:['Wifi','Full Kitchen','Washer & Dryer','Coffee Maker'],
        rates:{
            weekly:'500',
            monthly:'1500',
            nightly:'80'
        },
        seller_info:{
            name:'John Doe',
            email:'',
            phone:'123-456-7890'
        },
        images:[],

    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange=(e)=>{}
    const handleAmenitiesChangeChange=(e)=>{}
    const handleImageChange=(e)=>{}


    return (mounted && (
            <form>
                <h2 className="text-3xl text-center font-semibold mb-6">
                    Add Property
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
                    <label htmlFor="images" className="block text-gray-700 font-bold mb-2"
                    >Images (Select up to 4 images)</label
                    >
                    <input
                        type="file"
                        id="images"
                        name="images"
                        className="border rounded w-full py-2 px-3"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>

                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Property
                    </button>
                </div>
            </form>

        )
    )

}
export default PropertyAddForm;
import Link from "next/link";
// import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
import { fetchAllProperties } from "@/utils/requests";

// async function requests() {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             cache: 'no-store' // Ensure fresh data on each request
//         });
//
//         if (!res.ok) {
//             throw new Error('Failed to fetch properties');
//         }
//
//         const data = await res.json();
//         return data.properties;
//
//     } catch (error) {
//         console.error('Error fetching properties:', error);
//         return [];
//     }
//     return properties;
// }

const PropertiesPage = async () => {
    const properties = await fetchAllProperties();
    properties.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));// Sort by createdAt descending
    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.length === 0 ? (
                        <p>No properties available.</p>) : (

                        properties.map((property) => (
                            // <div key={property.id} className="border rounded-lg overflow-hidden shadow-md">
                            //     {property.name}
                            //
                            // </div>
                            <PropertyCard key={property._id} property={property}/>


                        ))

                    )}


                </div>
            </div>
        </section>
    )
};
export default PropertiesPage;
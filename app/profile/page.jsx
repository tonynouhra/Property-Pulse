'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useSession} from "next-auth/react";
import profileDefaultImage from '@/assets/images/profile.png';
import Spinner from "@/components/Spinner";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Swal from 'sweetalert2';

const ProfilePage = () => {
    const {data: session} = useSession();
    const profileImage = session?.user?.image || null;
    const userName = session?.user?.name || '';
    const userEmail = session?.user?.email || '';

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDeleteProperty = async (propertyId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`/api/properties/${propertyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Remove the property from state
                const updatedProperties = properties.filter((property) => property._id !== propertyId);
                setProperties(updatedProperties);
                toast.success('Property deleted successfully');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete property');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        const fetchUserProperties = async (userId) => {
            setLoading(true);
            if (!userId) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`/api/properties/user/${userId}`);

                if (response.ok === false) {
                    throw new Error('Failed to fetch user properties');
                }
                const data = await response.json();
                setProperties(data.properties || []);
            } catch (error) {
                console.error('Error fetching user properties:', error);
            } finally {
                setLoading(false);
            }
        }
        // Fetch properties when session is available
        if (session && session.user && session.user.id) {
            fetchUserProperties(session.user.id);
        }

    }, [session]);

    if (loading) {
        return <Spinner/>;
    }

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={profileImage || profileDefaultImage}
                                    alt="User"
                                    width={192}
                                    height={192}
                                />
                            </div>
                            <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span> {userName}
                            </h2>
                            <h2 className="text-2xl"><span className="font-bold block">Email: </span> {userEmail}
                            </h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                            {properties.length === 0 ? (
                                <p className="text-gray-600">You have no property listings yet.</p>
                            ) : (
                                properties.map((property) => (
                                    <div key={property._id} className="mb-10">
                                        <Link href={`/properties/${property._id}`}>
                                            <Image
                                                className="h-32 w-full rounded-md object-cover"
                                                src={property.images[0]}
                                                alt={property.name}
                                                width={500}
                                                height={128}
                                            />
                                        </Link>
                                        <div className="mt-2">
                                            <p className="text-lg font-semibold">{property.name}</p>
                                            <p className="text-gray-600">
                                                Address: {property.location.street}, {property.location.city}, {property.location.state}
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <Link
                                                href={`/properties/${property._id}/edit`}
                                                className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                                type="button"
                                                onClick={() => handleDeleteProperty(property._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage;

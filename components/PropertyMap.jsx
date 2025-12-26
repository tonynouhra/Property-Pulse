'use client';

import {useEffect, useState} from "react";
import {fromAddress, setDefaults} from "react-geocode";
import Spinner from "@/components/Spinner";
import Image from "next/image";

const PropertyMap = ({property}) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GEOCODE_API_KEY,
        language: "en",
        region: "lb"
    });

    // Fetch coordinates
    useEffect(() => {
        const fetchCoords = async () => {
            try {
                // Clean the address data by removing text in parentheses
                const cleanStreet = property.location.street.replace(/\s*\([^)]*\)/g, '').trim();
                const cleanCity = property.location.city.replace(/\s*\([^)]*\)/g, '').trim();
                const cleanState = property.location.state.replace(/\s*\([^)]*\)/g, '').trim();
                const cleanZip = property.location.zip.replace(/\s*\([^)]*\)/g, '').trim();

                const address = `${cleanStreet}, ${cleanCity}, ${cleanState} ${cleanZip}`;
                console.log("Geocoding address:", address);

                const res = await fromAddress(address);

                console.log("Geocode response:", res);

                if (res.results.length === 0) {
                    console.log("No geocoding results found");
                    setLoading(false);
                    setGeocodeError(true);
                    return;
                }

                const {lat, lng} = res.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
                setLoading(false);

                console.log("Coordinates fetched:", {lat, lng});
            } catch (error) {
                console.error("Geocoding error:", error);
                setLoading(false);
                setGeocodeError(true);
            }
        };

        fetchCoords();
    }, [property.location.street, property.location.city, property.location.state, property.location.zip]);

    if (loading) return <Spinner />;

    if (geocodeError) {
        return <div className="text-xl">No location data found</div>;
    }

    // Generate Mapbox Static Image URL
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l-marker+ff0000(${lng},${lat})/${lng},${lat},14,0/1000x500@2x?access_token=${mapboxToken}`;

    return (
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
            <a
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
            >
                <Image
                    src={staticMapUrl}
                    alt={`Map showing ${property.location.street}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1000px"
                />
            </a>
        </div>
    );
};

export default PropertyMap;
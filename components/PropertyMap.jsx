'use client';

import {useEffect, useState} from "react";
import {fromAddress, setDefaults} from "react-geocode";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);

const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);

const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);

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

    // Fix Leaflet icon issue in Next.js
    useEffect(() => {
        const L = require('leaflet');
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
    }, []);

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

    return (
        <div>
            <MapContainer
                center={[lat, lng]}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "500px", width: "100%", borderRadius: "10px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]}>
                    <Popup>
                        {property.location.street}<br />
                        {property.location.city}, {property.location.state}
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="mt-4">
                <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Open in Google Maps
                </a>
            </div>
        </div>
    );
};

export default PropertyMap;
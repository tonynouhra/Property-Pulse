/**

 // this file is server side by default in nextjs app router by default but using 'use client' it will become client side file
 // but here we are using 'use client' only for hooks not for whole file because we want to render this file in server side
 //useRouter is a hook so we need to use 'use client' for that
 // but rest of the file will be rendered in server side

 //useParams is also a hook but it can be used in server side also so we don't need to use 'use client' for that

 //useSearchParams is also a hook but it can be used in server side also so we don't need to use 'use client' for that
 // it used to get the search params from the url like ?name=value

 'use client'; // Required in App Router for hooks because it works on client side

 import {useRouter, useParams, useSearchParams, usePathname} from 'next/navigation';

 const PropertyPage = () => {

 const router = useRouter();
 const params = useParams(); // it will give the params from the url
 const searchParams = useSearchParams(); // it will give the search params from the url
 const name = searchParams.get('name',''); // it will give the value of the search param 'name'
 const pathname = usePathname(); // it will give the current path name




 console.log("Params:", params); // it will give the params from the url
 console.log("Search Params:", searchParams.toString()); // it will give the search params from the url
 console.log("Name:", name); // it will give the value of the search param 'name'
 console.log("Pathname:", pathname); // it will give the current path name



 return (
 console.log("Property Page Rendered server side"), // it will render in server level not in client side if we don't use 'use client' at the top
 <div>
 <button className="bg-blue-500 p-2" onClick={() => router.push('/')}> Go Home {params.id} {name}</button>

 </div>
 )
 }
 export default PropertyPage;
 **/
'use client'; // Required in App Router for hooks because it works on client side
import {useEffect, useState} from "react"; // useState is used to store the property data, useEffect is used to fetch the property data when the component is mounted
import {useParams} from 'next/navigation'; // useParams is used to get the id from the url


const PropertyPage = () => {
    const params = useParams(); // it will give the params from the url
    const [property, setProperty] = useState(null); // state to store the property data
    const [loading, setLoading] = useState(true); // state to track loading status
    const [error, setError] = useState(null); // state to track error

    useEffect(() => { // useEffect to fetch property data when component mounts
        const fetchPropertyData = async () => {
            const id = params.id;
            if (!id) return;

            try {
                const res = await fetch(`/api/properties/${id}`);
                if (!res.ok) throw new Error('Failed to fetch property');
                const data = await res.json();
                setProperty(data);// set the property data
            } catch (error) {
                console.error('Error fetching property:', error);
                setError(error.message); // set the error message
            } finally {
                setLoading(false); // set loading to false after fetching
            }
        };

        fetchPropertyData();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!property) return <div>Property not found</div>;

    return (
        <div>
            <h1>Property Page</h1>
            <p>Property ID: {params.id}</p>
            {/* Add more property details here */}
        </div>
    );
};

export default PropertyPage;
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
import {fetchProperty} from '@/utils/requests'; // import fetchProperty from utils


const PropertyPage = () => {
    const {id} = useParams(); // get the id from the url params
    const [property, setProperty] = useState(null); // state to store the property data
    const [loading, setLoading] = useState(true); // state to track loading status
    const [error, setError] = useState(null); // state to track error

    useEffect(() => { // useEffect to fetch property data when component mounts
        const fetchPropertyData = async () => {
            if (!id) return;

            try {
                const property = await fetchProperty(id);
                setProperty(property);// set the property data
            } catch (error) {
                console.error('Error fetching property:', error);
                setError(error.message); // set the error message
            } finally {
                setLoading(false); // set loading to false
            }
        };

        if (property === null){
            fetchPropertyData(); // call the fetch function
        }

        fetchPropertyData(); // call the fetch function
    }, [id]); // dependency array - refetch if id changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!property) return <div>Property not found</div>;

    return (
        <div>
            <h1>{property.name}</h1>
            {/* Add more property details here */}
        </div>
    );
};

export default PropertyPage;

/**
 *
 * 1. Component mounts → Renders with initial state (loading: true)
 *    ↓
 * 2. Browser displays: "Loading..."
 *    ↓
 * 3. useEffect runs → Fetches data
 *    ↓
 * 4. Data arrives → setState called
 *    ↓
 * 5. Component re-renders → Shows actual data
 *    ↓
 * 6. Browser updates: Shows property name
 * ## Important Points:
 * - ✅ **Everything happens CLIENT SIDE** (because of ) `'use client'`
 * - ✅ HTML is rendered **BEFORE** useEffect runs
 * - ✅ useEffect causes a **re-render** when it updates state
 * - ✅ User sees "Loading..." first, then the actual data
 *
 * So the sequence is:
 * 1. **Render** → Show loading
 * 2. **useEffect runs** → Fetch data
 * 3. **Re-render** → Show actual data
 *
 * The HTML isn't waiting for data - it renders immediately with whatever state you have!
 *
 *
 * 1. useEffect runs
 *    ↓
 * 2. fetchProperty(id) is called
 *    ↓
 * 3. Wait... (API request happening)
 *    ↓
 * 4. ✅ Data arrives!
 *    ↓
 * 5. setProperty(property) ← useState UPDATES // store the data abd notify React
 *    ↓
 * 6. React detects state change
 *    ↓
 * 7. Component RE-RENDERS with new data
 *    ↓
 * 8. Browser shows the property name
 */
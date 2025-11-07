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

const PropertyPage = () => {
    return (
        <div>
            Property Page
        </div>
    )
}
export default PropertyPage;
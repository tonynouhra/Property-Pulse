import {NextResponse} from 'next/server';
import connectDB from "@/config/database";
import Property from "@/models/Property";
import {getSessionUser} from "@/utils/getSessionUser";
import imagekit from "@/config/Imagekit";

//Get /api/properties
export const GET = async (request) => {
    try {
        await connectDB();
        const properties = await Property.find({});
        // console.log('Fetched properties:', properties);

        return NextResponse.json({
            // message: 'Properties fetched successfully',
            // data: properties
            properties
        }, {status: 200});


        // return new Response(JSON.stringify({
        //     message: 'Properties fetched successfully',
        //     properties: []
        // }), {status: 200});
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({
            message: 'Properties fetched successfully',
            properties: []
        }, {status: 500});
    }


};

//POST /api/properties
// Option 1: JavaScript form submission (current implementation)
// - Uses fetch() with FormData from handleSubmit in the component
// - No page reload, better UX
// - Can easily add loading states and error handling in the UI
//
// Option 2 alternative (HTML form submission):
// - Keep <form action="/api/properties" method="POST" encType="multipart/form-data">
// - Remove handleSubmit and onSubmit from the form component
// - This code below would still work the same way
// - Page will reload after submission (traditional form behavior)
// - Would need to redirect user with: return NextResponse.redirect(new URL('/properties', request.url))
export const POST = async (request) => {
    try {
        await connectDB();



        const sessionUser = await  getSessionUser();
        if (!sessionUser || !sessionUser.id) {
            return Response.json({
                message: 'User Id required'
            }, {status: 401});
        }
        console.log('Session user:', sessionUser);
        const userId = sessionUser.id;

        console.log('Authenticated user ID:', userId);

        const formData = await request.formData();

        // Get image files from form
        const imageFiles = formData.getAll('images').filter((image) => image.name !== '');

        // Upload images to ImageKit
        const imageUrls = [];

        for (const imageFile of imageFiles) {
            // Convert File to buffer
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Upload to ImageKit
            const uploadResponse = await imagekit.upload({
                file: buffer,
                fileName: imageFile.name,
                folder: '/propertypulse'
            });

            imageUrls.push(uploadResponse.url);
        }

        console.log('Uploaded images:', imageUrls);

        // Parse FormData into a proper object structure
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zip: formData.get('location.zipcode') // Schema uses 'zip', not 'zipcode'
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities: formData.getAll('amenities'),
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly')
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone')
            },
            owner: userId,
            images: imageUrls
        };

        console.log('Creating property with data:', propertyData);

        const newProperty = new Property(propertyData);
        await newProperty.save();

        // Return JSON for JavaScript form submission (Option 1)
        return NextResponse.json({
            message: 'Property created successfully',
            property: newProperty
        }, {status: 201});

        // Use this for HTML form submission (Option 2):
        // return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json({
            message: 'Error creating property',
            error: error.message
        }, {status: 500});
    }
}
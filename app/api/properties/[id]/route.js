import {NextResponse} from 'next/server';
import connectDB from "@/config/database";
import Property from "@/models/Property";
import {getSessionUser} from "@/utils/getSessionUser";
import imagekit from "@/config/Imagekit";


//Get /api/properties/:id
export const GET = async (request, {params}) => {
    try {
        await connectDB();
        const {id} = await params; //in next 15 the params shoud be awaited
        const property = await Property.findById(id);
        // console.log('Fetched properties:', properties);
        if (!property) {
            return NextResponse.json({
                message: 'Property not found'
            }, {status: 404});
        }

        return NextResponse.json({
            // message: 'Properties fetched successfully',
            // data: properties
            property
        }, {status: 200});


    } catch (error) {
        console.error('Error fetching property:', error);
        return NextResponse.json({
            message: 'property fetched successfully',
            properties: []
        }, {status: 500});
    }


};

//DELETE /api/properties/:id
export const DELETE = async (request, {params}) => {
    try {
        const {id} = await params; //in next 15 the params shoud be awaited
        const sessionUser = await getSessionUser();

        //check for session user
        if (!sessionUser || !sessionUser.id) {
            return NextResponse.json({
                message: 'User Id required'
            }, {status: 401});
        }

        const userId = sessionUser.id;

        await connectDB();
        const property = await Property.findById(id);

        if (!property) {
            return NextResponse.json({
                message: 'Property not found'
            }, {status: 404});
        }

        //verify ownership
        if (property.owner.toString() !== userId) {
            return NextResponse.json({
                message: 'Unauthorized to delete this property'
            }, {status: 403});
        }

        await property.deleteOne();

        return NextResponse.json({
            message: 'Property deleted successfully'
        }, {status: 200});
    } catch (error) {
        console.error('Error deleting property:', error);
        return NextResponse.json({
            message: 'Error deleting property'
        }, {status: 500});
    }
};

//PUT /api/properties/:id
export const PUT = async (request, {params}) => {
    try {
        const {id} = await params;
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.id) {
            return NextResponse.json({
                message: 'User Id required'
            }, {status: 401});
        }

        const userId = sessionUser.id;

        await connectDB();
        const property = await Property.findById(id);

        if (!property) {
            return NextResponse.json({
                message: 'Property not found'
            }, {status: 404});
        }

        // Verify ownership
        if (property.owner.toString() !== userId) {
            return NextResponse.json({
                message: 'Unauthorized to update this property'
            }, {status: 403});
        }

        const formData = await request.formData();

        // Get new image files from form
        const newImageFiles = formData.getAll('images').filter((image) => image.name !== '');

        // Get existing images to keep (URLs as strings)
        const existingImages = formData.getAll('existingImages');

        // Upload new images to ImageKit
        const newImageUrls = [];
        for (const imageFile of newImageFiles) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResponse = await imagekit.upload({
                file: buffer,
                fileName: imageFile.name,
                folder: '/propertypulse'
            });

            newImageUrls.push(uploadResponse.url);
        }

        // Combine existing images (not deleted) with newly uploaded images
        const allImages = [...existingImages, ...newImageUrls];

        // Update property data
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zip: formData.get('location.zipcode')
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
            images: allImages
        };

        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData, {
            new: true,
            runValidators: true
        });

        return NextResponse.json({
            message: 'Property updated successfully',
            property: updatedProperty
        }, {status: 200});

    } catch (error) {
        console.error('Error updating property:', error);
        return NextResponse.json({
            message: 'Error updating property',
            error: error.message
        }, {status: 500});
    }
};
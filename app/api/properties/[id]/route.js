import {NextResponse} from 'next/server';
import connectDB from "@/config/database";
import Property from "@/models/Property";
import {getSessionUser} from "@/utils/getSessionUser";


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
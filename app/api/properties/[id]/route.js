import {NextResponse} from 'next/server';
import connectDB from "@/config/database";
import Property from "@/models/Property";


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
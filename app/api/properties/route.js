import {NextResponse} from 'next/server';
import connectDB from "@/config/database";
import Property from "@/models/Property";


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
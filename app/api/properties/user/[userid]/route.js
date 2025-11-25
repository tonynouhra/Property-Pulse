import {NextResponse} from 'next/server';
import connectDB from "@/config/database";
import Property from "@/models/Property";


//Get /api/properties/user/[userid]
export const GET = async (request, {params}) => {
    try {
        await connectDB();
        const userId = (await params).userid;

        if (!userId) {
            return new Response('User Id required',
                {status: 400});
        }

        const properties = await Property.find({owner: userId});
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

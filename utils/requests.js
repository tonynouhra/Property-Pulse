const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchAllProperties() {
    try {
        if (!apiDomain) {
            return [];
        }
        const res = await fetch(`${apiDomain}/properties`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store' // Ensure fresh data on each request
        });

        if (!res.ok) {
            throw new Error('Failed to fetch properties');
        }

        const data = await res.json();
        return data.properties;

    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
    return properties;
}


// fetch single property by id
async function fetchProperty(id) {
    try {
        if (!apiDomain) {
            return null;
        }
        const res = await fetch(`${apiDomain}/properties/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store' // Ensure fresh data on each request
        });

        if (!res.ok) {
            throw new Error('Failed to fetch property');
        }

        const data = await res.json();
        return data.property;

    } catch (error) {
        console.error('Error fetching property:', error);
        return null;
    }
}

export  {fetchAllProperties, fetchProperty};
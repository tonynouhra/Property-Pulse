import InfoBox from './infoBox';


const infoBoxes = () => {

    return (
        <section>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <InfoBox
                        heading="For Renters"
                        backgroundColor="bg-gary-100"
                        buttonInfo={{
                            text: 'Browse Properties',
                            link: "/properties",
                            backgroundColor: 'bg-black',
                        }}>
                        Find your perfect rental property from our extensive listings.

                    </InfoBox>
                    <InfoBox
                        heading="For Property Owners"
                        backgroundColor="bg-blue-100"
                        buttonInfo={{
                            text: 'List Your Property',
                            link: "/properties/add",
                            backgroundColor: 'bg-blue-700',
                        }}>
                        Reach a wide audience of potential renters by listing your property with us.
                    </InfoBox>


                </div>
            </div>
        </section>
    )
}

export default infoBoxes;
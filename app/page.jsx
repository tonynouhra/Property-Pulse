// import Link from 'next/link'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/infoBoxes'
import HomeProperties from '@/components/HomeProperties';

const HomePage = () => {
    return (
        // <div>
        //     <h1 className="text-3xl"> Welcome </h1>
        //     <Link href="/properties" className="text-blue-500 underline"> View Properties</Link>
        //
        // </div>
        <>
            <Hero/>
            <InfoBoxes/>
            <HomeProperties/>
        </>)
}

export default HomePage
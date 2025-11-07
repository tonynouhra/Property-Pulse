import '@/assets/styles/globals.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: 'PropertyPulse | Find Your Dream Home',
    description: 'Find your perfect property with PropertyPulse - your trusted real estate partner.',
    keywords: 'real estate, property, homes for sale, apartments, rentals, real estate agent, property listings, house hunting, realty, home buying, home selling',
}
const MainLayout = ({children}) => {
    return (
        <html lang="en">
        <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    )
}

export default MainLayout
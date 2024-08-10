import HowToUse from "./HowToUse";
import Hero from "./Hero";
import Nav from "./Nav";
import About from "./About";
import Footer from "./Footer";

export default function Landing() {
    return (
        <>
            <Nav />
            <Hero />
            <About />
            <HowToUse/>
            <Footer/>
        </>
    )
}

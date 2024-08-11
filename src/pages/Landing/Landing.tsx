import HowToUse from "./HowToUse";
import Hero from "./Hero";
import Nav from "./Nav";
import About from "./About";
import Footer from "./Footer";
import { useNavigatorOnLine } from "../../utils/hooks/useNavigatorOnLine";
import { useAppSelector } from "../../store/hooks/redux";
import OfflineMessage from "../../utils/components/ui/OfflineMessage";
import LoadingsBars from "../../utils/components/ui/LoadingsBars";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const { status: isOnline } = useNavigatorOnLine()
    const navigate = useNavigate()
    const { isAuth, isLoading } = useAppSelector(state => state.userReducer)


    if (!isOnline) {
        return (
            <OfflineMessage />
        )
    }

    if (isLoading) {
        return <LoadingsBars />
    }

    if (isAuth) {
        navigate("/")
    }

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

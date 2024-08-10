import InfoBlock from "./Info/InfoBlock";
import LogInImg from "../../assets/img/LogIn.png"
import FeedImg from "../../assets/img/Feed.png"
import FindMoreImg from "../../assets/img/FindMore.png"
import AddSongImg from "../../assets/img/AddSong.png"
import LikedImg from "../../assets/img/Liked.png"
import InfoImg from "../../assets/img/Info.png"
import SectionHeader from "./components/SectionHeader";
import Section from "./components/Section";

export default function HowToUse() {
    return (
        <Section id={"howToUse"}>
            <SectionHeader>How to use our service?</SectionHeader>
            <div className="flex flex-col gap-10 md:gap-6">
                <InfoBlock
                    title="Log In or Sing Up to start the journey"
                    number={1}
                    imageUrl={LogInImg}
                    className="animation-view animate-appear"
                />
                <InfoBlock
                    title="Find Songs you will love"
                    number={2}
                    imageUrl={FeedImg}
                    direction="reverse"
                    className="animation-view animate-appear "
                />
                <InfoBlock
                    title="Like song by clicking on the heart"
                    number={3}
                    imageUrl={LikedImg}
                    className="animation-view animate-appear "
                />
                <InfoBlock
                    title="Explore new songs"
                    number={4}
                    imageUrl={FindMoreImg}
                    direction="reverse"
                    className="animation-view animate-appear "
                />
                <InfoBlock
                    title="Find song details a song by pressing info button"
                    description="Here you can find additional song information and listen for the song on YouTube Music"
                    number={4}
                    imageUrl={InfoImg}
                    className="animation-view animate-appear "
                />
                <InfoBlock
                    title="Add you favourite song by pressing on you avatar in the rop right corner"
                    description="Press add a song and specify genra and mood of the song"
                    number={4}
                    imageUrl={AddSongImg}
                    direction="reverse"
                    className="animation-view animate-appear "
                />
            </div>
        </Section>
    )
}

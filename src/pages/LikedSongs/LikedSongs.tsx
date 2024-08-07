import { useState } from "react";
import { Link } from "react-router-dom";
import HeroHeader from "../../components/HeroHeader";
import HeroWrapper from "../../components/HeroWrapper";
import SongItem from "../../components/SongItem";
import SongsWrapper from "../../components/SongsWrapper";
import { musicLoversAPI } from "../../store/api/musicLoversAPI";
import { useAppSelector } from "../../store/hooks/redux";
import SongInfo from "../Feed/SongInfo";
import { SongRes } from "../../models/music/songs";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import NoData from "../../components/NoData";
import SongListSketelon from "../../components/SongListSketelon";

const SongInitialState = {
    link: '',
    genres: [],
    moods: [],
    _id: '',
    songDetails: {
        title: '',
        channelTitle: '',
        thumbnail: {
            height: '',
            url: '',
            width: 0
        },
    }
}


const SongsPageInitialState = {
    songs: [],
    totalPages: 0
}

export default function LikedSongs() {
    const [searchParams] = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1
    const genresQuery = searchParams.get("genres") || ''
    const moodsQuery = searchParams.get("moods") || ''

    const { user } = useAppSelector(state => state.userReducer)
    const { data: favSongsPage = SongsPageInitialState, isLoading: songsLoading } = musicLoversAPI.useGetFavouriteSongsQuery({ userId: user.id, currentPage, filters: { moods: moodsQuery, genres: genresQuery } }, { skip: !(user.id) })
    const { songs, totalPages } = favSongsPage

    const [song, setSong] = useState<SongRes>(SongInitialState)
    const [showModal, setShowModal] = useState(false)

    return (
        <HeroWrapper>
            <div className='flex justify-between items-center mb-6'>
                <HeroHeader>Liked Songs</HeroHeader>
                <div className='flex gap-4'>
                    <Link to={"../filters/likedSongs"}>
                        <button className="btn btn-primary btn-sm">Filters
                            <FontAwesomeIcon style={{ marginLeft: '5px' }} size="lg" icon={faFilter} />
                        </button>
                    </Link>
                </div>
            </div>
            <div className={"grid grid-rows-[1fr_auto] bg-neutral p-4 w-full flex-1 gap-4 rounded-t-box overflow-hidden" + (!showModal ? ' grid-cols-1' : ' grid-cols-[1fr_50%]')}>
                <SongsWrapper>
                    {songsLoading && <SongListSketelon/>}
                    {songs.length > 0
                        ?
                        songs?.map(song => <SongItem song={song} setSong={setSong} setShowModal={setShowModal} key={song._id} user={user.id} isLiked={songs?.some(likedSong => likedSong._id == song._id)} />)
                        :
                        <NoData />

                    }
                </SongsWrapper>
                {showModal && <SongInfo song={song} setShowModal={setShowModal} />}
                <div className={(showModal ? 'col-span-2' : '')}>
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </HeroWrapper>
    )
}

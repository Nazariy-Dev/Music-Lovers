import { useState } from 'react';
import SongItem from '../../components/SongItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { musicLoversAPI } from '../../store/api/musicLoversAPI';
import { useAppSelector } from '../../store/hooks/redux';
import { Link, useSearchParams } from 'react-router-dom';
import SongInfo from './SongInfo';
import { SongRes } from '../../models/music/songs';
import Pagination from '../../components/Pagination';
import HeroWrapper from '../../components/HeroWrapper';
import HeroHeader from '../../components/HeroHeader';
import SongsWrapper from '../../components/SongsWrapper';
import NoData from '../../components/NoData';
import SongListSketelon from '../../components/SongListSketelon';

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

export default function Feed() {
    const [searchParams] = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1
    const genresQuery = searchParams.get("genres") || ''
    const moodsQuery = searchParams.get("moods") || ''

    const [song, setSong] = useState<SongRes>(SongInitialState)
    const [showModal, setShowModal] = useState(false)

    const { user } = useAppSelector(state => state.userReducer)

    const { data: favSongsIds = [] } = musicLoversAPI.useGetFavouriteSongsIdsQuery(user?.id, { skip: !user.id })
    const { data: songPage = SongsPageInitialState, isFetching: songsLoading } = musicLoversAPI.useGetSongsQuery({ currentPage, filters: { moods: moodsQuery, genres: genresQuery } });
    const { songs, totalPages } = songPage
    

    return (
        <HeroWrapper>
            <div className='flex justify-between items-center mb-6'>
                <HeroHeader>Feed</HeroHeader>
                <div className='flex gap-4'>
                    <Link to={"filters/feed"}>
                        <button className="btn btn-primary btn-sm">Filters
                            <FontAwesomeIcon style={{ marginLeft: '5px' }} size="lg" icon={faFilter} />
                        </button>
                    </Link>
                </div>
            </div>
            <div className={"grid grid-rows-[1fr_auto] grid-cols-1 bg-neutral p-3 sm:p-4 w-full flex-1 gap-4 rounded-t-box overflow-hidden" + (!showModal ? ' ' : ' sm:grid-cols-[1fr_50%]  gap-y-4 gap-x-0 sm:gap-x-4')}>
                <SongsWrapper className={ (showModal ? "sm:flex hidden " : ' flex')}>
                    {songsLoading ? <SongListSketelon /> : songs?.map(song => <SongItem song={song} setSong={setSong} setShowModal={setShowModal} key={song._id} user={user.id} isLiked={favSongsIds?.some(likedSongId => likedSongId === song._id)} />)}
                    {(songs.length ==0 && !songsLoading) && <NoData/>}
                </SongsWrapper>
                {showModal && <SongInfo song={song} setShowModal={setShowModal} />}
                <div className={(showModal ? 'col-span-2' : '')}>
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </HeroWrapper>
    );
}

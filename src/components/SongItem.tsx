import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faInfo } from '@fortawesome/free-solid-svg-icons'
import { SongRes } from '../models/music/songs'
import { musicLoversAPI } from '../store/api/musicLoversAPI'
import { memo, useEffect } from 'react'

export interface SongItemProps {
    song: SongRes
    user: string
    isLiked: boolean | undefined,
    setShowModal: (value: boolean) => void,
    setSong: (song: SongRes) => void
}

function SongItem({ setShowModal, setSong, user, isLiked, song }: SongItemProps) {
    const [toggleFavourite] = musicLoversAPI.useToggleFavouriteMutation()
    const { link, songDetails } = song

    const onToggleFavourite = () => {
        toggleFavourite({ user, link })
    }

    const onInfoClick = () => {
        setSong(song)
        setShowModal(true)
    }


    return (
        <div className='flex w-full rounded-btn bg-base-300 items-center justify-between py-2 px-4'>
            <div className='flex text-sm items-center gap-3 truncate'>
                <div className='w-9 h-9'>
                    <img className='w-full h-full object-cover' src={songDetails?.thumbnail.url} alt="" />
                </div>
                <div className='flex-[1] truncate pr-3'>
                    <div className='truncate'>{songDetails?.title}</div>
                    <div className='opacity-60 truncate'>{songDetails?.channelTitle}</div>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='btn btn-primary btn-sm' onClick={() => onToggleFavourite()}>
                    <FontAwesomeIcon size="xl" className={isLiked ? "text-white" : ''} icon={faHeart} />
                </div>
                <div className='btn btn-secondary btn-sm ' onClick={() => onInfoClick()}>
                    <FontAwesomeIcon size="xl" icon={faInfo} />
                </div>
            </div>
        </div>

    )
}

export default memo(SongItem)

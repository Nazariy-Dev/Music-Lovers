import React from 'react'
import { SongRes } from '../models/music/songs'
import SongItem from './SongItem'

interface SongListProps {
    songs: SongRes[]
    song: SongRes
    user: string
    setShowModal: (value: boolean) => void,
    setSong: (song: SongRes) => void
}

export default function SongsList(songListProps: SongListProps) {
    const { songs } = songListProps
    console.log("🚀 ~ SongsList ~ songListProps:", songListProps)
    // const songItemPropts = songListPros
    return (
        <>
            {songs?.map(song => (
                <SongItem  {...songListProps} isLiked={songs?.some(likedSong => likedSong._id == song._id)} />
            ))}
        </>
    )
}

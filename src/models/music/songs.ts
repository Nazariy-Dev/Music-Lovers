export interface SongPage {
    songs: SongRes[],
    totalPages: number
}

export interface SongPageParams {
    filters: SongsFilters
    currentPage: number,
    userId?: string
}

interface SongsFilters {
    moods: string,
    genres: string
}

export interface SongRes {
    link: string,
    genres: LabelRes[],
    moods: LabelRes[],
    _id: string, 
    songDetails: SongDetails
}
export interface SongReq {
    link: string,
    genresIds?: string[],
    moodsIds?: string[],
}

interface Thumbnail {
    height: string,
    url: string,
    width: number
}

export interface SongDetails {
    title: string,
    channelTitle: string,
    thumbnail: Thumbnail,
}

export interface LabelRes {
    _id: string,
    name: string,

}

export interface AddFav {
    user: string,
    link: string
}

export interface Labels {
    moodsIds: string[], genresIds: string[]
}
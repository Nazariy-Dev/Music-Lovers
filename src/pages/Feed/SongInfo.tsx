import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SongRes } from "../../models/music/songs"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

interface SongItemProps {
    setShowModal: (value: boolean) => void,
    song: SongRes
}

interface LabelProps {
    color: "primary" | "secondary",
    label: string
}

function Label({ color, label }: LabelProps) {
    return (
        <div className={"py-1 px-2 rounded-btn font-bold" + (color == "primary" ? " bg-primary btn-primary" : (color == "secondary" ? " bg-secondary btn-secondary" : ''))}>{label}</div>
    )
}

export default function SongInfo({ setShowModal, song }: SongItemProps) {
    return (
        <div className="rounded-btn flex gap-4 flex-col bg-base-200 p-4 h-full relative overflow-y-auto">
            <button className="absolute top-0 right-0 w-1 btn btn-accent btn-sm" onClick={() => setShowModal(false)}>X</button>

            <h2 className="text-4xl font-bold mb-2">{song.songDetails.title}</h2>

            <a href={song.link} target="_blank" className="mb-2 cursor-pointer relative pb-[55%] h-0 border-solid border-primary border-2 rounded-btn">
                <img className="rounded-btn absolute top-0 left-0 w-full h-full object-cover" src={song.songDetails.thumbnail.url} alt="" />
                <FontAwesomeIcon size="4x" className="text-primary  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" icon={faPlay} />
            </a>

            <div className="flex flex-col gap-4">
                <div className="gap-2 flex flex-wrap">
                    {song.genres.map(genre => <Label key={genre._id} label={genre.name} color="secondary" />)}
                </div>
                <div className="gap-2 flex flex-wrap">
                    {song.moods.map(mood => <Label key={mood._id}  label={mood.name} color="primary" />)}
                </div>
            </div>
        </div>
    )
}

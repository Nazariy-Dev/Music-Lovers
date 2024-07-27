import { Controller, useForm } from "react-hook-form"
import { musicLoversAPI } from "../../store/api/musicLoversAPI"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, TextField, debounce, styled } from '@mui/material';
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeroWrapper from "../../components/HeroWrapper";
import HeroHeader from "../../components/HeroHeader";

const YOUTUVE_MUIC_REGEX = /^(?:https?:\/\/)?(?:www\.)?music\.youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;

const schema = z.object({
    link: z.string().regex(YOUTUVE_MUIC_REGEX, "Invalid YouTube Muisc link"),
    genres: z.array(z.any()).optional(),
    moods: z.array(z.any()).optional()
})

type FormFields = z.infer<typeof schema>

const StyledTextField = styled(TextField)` */
    .MuiFormLabel-root {
        color: var(--fallback-bc, oklch(var(--bc) / var(--tw-text-opacity)));
    }

    .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
        border-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
        border-width: 1px;
    }

    .css-1gywuxd-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
        border-width: 1px;
    }

    .MuiOutlinedInput-notchedOutline{
        border-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
        border-radius: var(--rounded-btn, 0.5rem /* 8px */);
        border-width: 1px;
    }
  
    // input box
    .MuiOutlinedInput-root{
        border-radius: var(--rounded-btn, 0.5rem /* 8px */);
        background-color: var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)));
    }

    /* & .css-jtwvg1-MuiFormControl-root-MuiTextField-root{
        overflow: auto !important;
        max-height: 56px !important;
        width: 0;
        background-color: aliceblue;
    } */

    .MuiChip-root{
        background-color: var(--fallback-nc, oklch(var(--nc) / var(--tw-bg-opacity)));
        color: var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)));
    }

    .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input, 
    .css-152mnda-MuiInputBase-input-MuiOutlinedInput-input,  
    .css-ptiqhd-MuiSvgIcon-root,
    .css-qzbt6i-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator {
       color: var(--fallback-bc,oklch(var(--bc)/1));
    }
    .css-z0g2be-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-popupIndicator {
       color: var(--fallback-bc,oklch(var(--bc)/1));
    }
`

export default function AddSong() {
    const { control, register, handleSubmit, formState: { errors, isSubmitting, } } = useForm<FormFields>({ resolver: zodResolver(schema) })

    const [moodsQuery, setMoodsQuery] = useState<string>('')
    const [genresQuery, setGenresQuery] = useState<string>('')
    const [addSong, { error }] = musicLoversAPI.useAddSongMutation()
    const { data: moodsOptions = [], isLoading: moodsLoading } = musicLoversAPI.useGetMoodsQuery(moodsQuery, { skip: !moodsQuery })
    const { data: genresOptions = [], isLoading: genresLoading } = musicLoversAPI.useGetGenresQuery(genresQuery, { skip: !genresQuery })

    const onAddSong = async function (data: FormFields) {
        const { link, moods, genres } = data
        let moodsIds = moods?.map(value => value._id)
        let genresIds = genres?.map(value => value._id)

        const song = await addSong({ link, moodsIds, genresIds })
        console.log(song)
    }


    const debouncedFetchMoodsOptions = useMemo(
        () =>
            debounce((query: string) => {
                setMoodsQuery(query);
            }, 500),
        []
    );

    const debouncedFetchGenresOptions = useMemo(
        () =>
            debounce((query: string) => {
                setGenresQuery(query);
            }, 500),
        []
    );


    return (
        <HeroWrapper>
            <div className='flex justify-between items-center mb-6'>
                <HeroHeader>Add a song</HeroHeader>
            </div>
            <div className="bg-neutral rounded-t-box p-4 pt-6 relative flex-1" >
                <form onSubmit={handleSubmit(onAddSong)} className="flex flex-col h-full  gap-4  ">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text" >Link to YouTube Music video</span>
                        </div>
                        <input {...register("link")} type="text" placeholder="YouTube video link" className="input p-[12px] placeholder:text-base-content placeholder:opacity-[0.41] input-bordered w-full h-[3.5em]" />
                        {errors.link && <div className='mt-2 text-error'>{errors.link.message}</div>}

                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text" >Mood</span>
                        </div>
                        <Controller
                            name="moods"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    multiple
                                    disablePortal
                                    loading={moodsLoading}
                                    options={moodsOptions}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, value) => onChange(value)}
                                    isOptionEqualToValue={(option, value) => option._id === value._id}
                                    value={value}
                                    onInputChange={(e, value) => debouncedFetchMoodsOptions(value)}
                                    renderInput={(params) => (
                                        <StyledTextField {...params} placeholder="Select song mood" />
                                    )}
                                />
                            )}
                        />

                    </label>

                    <label className="form-control w-full flex-1">
                        <div className="label">
                            <span className="label-text" >Genre</span>
                        </div>
                        <Controller
                            name="genres"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    multiple
                                    disablePortal
                                    loading={genresLoading}
                                    options={genresOptions}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, value) => onChange(value)}
                                    isOptionEqualToValue={(option, value) => option._id === value._id}
                                    value={value}
                                    onInputChange={(e, value) => debouncedFetchGenresOptions(value)}
                                    renderInput={(params) => (
                                        <StyledTextField {...params} placeholder="Select music genre" />
                                    )}
                                />
                            )}
                        />

                    </label>

                    {error?.message && <div className='mt-2 text-error'>{error.message}</div>}
                    <button className={"btn btn-primary btn-sm" + (isSubmitting ? " btn-disabled" : '')}>Add song</button>


                </form>
                <Link to={"/"} className=" absolute top-4 right-4">
                    <button className="w-1 btn btn-accent btn-sm">X</button>
                </Link>
            </div>
        </HeroWrapper>

    )
}
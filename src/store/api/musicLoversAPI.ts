import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../utils/services/axiosService";
import { AddFav, LabelRes, SongPage, SongPageParams, SongReq, SongRes } from "../../models/music/songs";

export const musicLoversAPI = createApi({
    reducerPath: 'musicLoversAPI',
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Songs", "FavouriteSongs", "FavouriteSongsIds", "DiscoverSongs"],
    endpoints: (build) => {
        return ({
            // login: build.mutation<AuthResponseSuccess, AuthLoginRequest>({
            //     query: ({ email, password }) => ({
            //         url: '/login',
            //         data: { email, password }
            //     })
            // }),
            // registration: build.mutation<AuthResponseSuccess, AuthSignUpRequest>({
            //     query: ({ email, password, name },) => ({
            //         url: '/registration',
            //         data: { email, password, name }
            //     })
            // }),
            // checkAuth: build.mutation<AuthResponseSuccess, void>({
            //     query: () => ({
            //         url: '/refresh',
            //         method: 'get'
            //     }),
            //     transformResponse(response: AxiosResponse<AuthResponseSuccess>) {
            //         localStorage.setItem('token', response.data.accessToken);
            //     }
            // }),
            getSongs: build.query<SongPage, SongPageParams>({
                query: ({ currentPage, filters: { moods, genres } }) => {
                    const params = new URLSearchParams();

                    if (moods.length > 0) {
                        params.append("moods", moods);
                    }
                    if (genres.length > 0) {
                        params.append("genres", genres);
                    }

                    const query = params.toString();
                    return {
                        url: `/songs?currentPage=${currentPage}&${query}`,
                    };
                },
                providesTags: ["Songs"],
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
            }),
            discoverSongs: build.query<SongPage, SongPageParams>({
                query: ({ userId, currentPage, filters: { moods, genres } }) => {
                    const params = new URLSearchParams();

                    if (moods.length > 0) {
                        params.append("moods", moods);
                    }
                    if (genres.length > 0) {
                        params.append("genres", genres);
                    }

                    const query = params.toString();

                    return {
                        url: `/discoverSongs?userId=${userId}&currentPage=${currentPage}&${query}`,
                    };
                },
                providesTags: ["DiscoverSongs"]
            }),
            getFavouriteSongs: build.query<SongPage, SongPageParams>({
                query: ({ userId, currentPage, filters: { moods, genres } }) => {
                    const params = new URLSearchParams();

                    if (moods.length > 0) {
                        params.append("moods", moods);
                    }
                    if (genres.length > 0) {
                        params.append("genres", genres);
                    }

                    const query = params.toString();

                    return {
                        url: `/favouriteSongs?userId=${userId}&currentPage=${currentPage}&${query}`,
                    };
                },
                providesTags: ["FavouriteSongs"],
            }),
            getFavouriteSongsIds: build.query<string[], string>({
                query: (userId) => ({
                    url: `/favouriteSongsIds?userId=${userId}`,
                }),
                providesTags: ["FavouriteSongsIds"],
            }),

            addSong: build.mutation<SongRes, SongReq>({
                query: ({ link, moodsIds, genresIds }) => ({
                    url: '/songs',
                    data: { link, moodsIds, genresIds },
                    method: "post"
                }),
                invalidatesTags: ["Songs"],
            }),
            toggleFavourite: build.mutation<any, AddFav>({
                query: ({ user, _id }) => ({
                    url: '/users',
                    data: { user, _id },
                    method: 'patch'
                }),
                async onQueryStarted({ _id, user }, { dispatch, queryFulfilled }) {
                    // Update the cached data for getSongs query
                    const patchResult = dispatch(
                        musicLoversAPI.util.updateQueryData('getFavouriteSongsIds', user, (draft) => {
                            const index = draft.indexOf(_id)
                            const isInCashe = index != -1
                            isInCashe ? draft.splice(index, 1) : draft.push(_id);
                        })
                    );

                    try {
                        await queryFulfilled;
                    } catch {
                        patchResult.undo();
                    }
                },

                invalidatesTags: ["FavouriteSongs", "FavouriteSongsIds", "DiscoverSongs"],
            }),
            getMoods: build.query<LabelRes[], string>({
                query: (query) => ({
                    url: `/moods?query=${query}`
                })
            }),
            getGenres: build.query<LabelRes[], string>({
                query: (query) => ({
                    url: `/genres?query=${query}`
                })
            })
        });
    }
})

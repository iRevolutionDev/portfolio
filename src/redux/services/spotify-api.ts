import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SpotifyResponse} from "@/@types/spotify-response";

export const spotifyApi = createApi({
    reducerPath: "spotifyApi",
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/`,
    }),
    endpoints: (builder) => ({
        getTracks: builder.query<SpotifyResponse, void>({
            query: () => "spotify/me",
        }),
    }),
});

export const {useGetTracksQuery} = spotifyApi;
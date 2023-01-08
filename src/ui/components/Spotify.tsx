import React from "react";
import {SiSpotify} from "react-icons/si";

const Spotify: React.FC = () => {
    return (
        <p className="text-right select-none sm:select-text w-full inline-flex text-lg rounded-sm focus:outline-none focus:opacity-100 focus:ring items-center space-x-2 no-underline opacity-50 hover:opacity-100 h-12 mt-0.5">
            <span>Not playing anything</span>
            <span>
                <SiSpotify/>
            </span>
        </p>
    )
}

export default Spotify;
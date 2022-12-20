import {NextPage} from "next";
import {FaGithub, FaLinkedin, FaSpotify, TiLocation} from "react-icons/all";
import Link from "next/link";

const Page: NextPage = () => {
    return (
        <div className="space-y-4">
            <div className="flex space-x-4 items-center my-5">
                <Link href="https://github.com/iRevolutionDev" target="blank">
                    <FaGithub size={32}/>
                </Link>
                <Link href="https://linkedin.com" target="blank">
                    <FaLinkedin size={32}/>
                </Link>
                <Link href="https://open.spotify.com/user/jcm4iped0mnqusg2cvq5hy26z" target="blank">
                    <FaSpotify size={32}/>
                 </Link>
                <Link href="https://www.google.com/maps/place/S%C3%A3o+Paulo,+SP" target="blank">
                    <div className="bg-dark-50 p-2 rounded-full flex items-center space-x-2">
                        <TiLocation size={20}/>
                        <h1 className="">Brazil / São Paulo</h1>
                        <div className="bg-dark-100 rounded-full w-4 h-4 ml-2"></div>
                    </div>
                </Link>
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-7xl">Hello, I&apos;m <span className="text-brand-name">Revolution</span> 👋</h1>
            <p className="opacity-60">
                I am a software engineer, and I&apos;m passionate Reverse Engineering, C++, game development, and web development.
            </p>
        </div>
    )
}

export default Page;
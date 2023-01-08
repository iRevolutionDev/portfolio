import React from "react";
import Link from "next/link";

import {
    FaGithub, FaLinkedin, FaSpotify,
    SiAndroidstudio, SiCplusplus, SiCsharp,
    SiDart, SiFlutter, SiGit, SiHackthebox,
    SiJavascript, SiPython, SiReact,
    SiRust, SiTailwindcss, SiTypescript,
    SiYarn, TiLocation,
} from "react-icons/all";

import CopyToClipboard from "@/ui/components/CopyToClipboard";
import Card from "@/ui/components/Card";
import IconsContainer from "@/ui/components/IconsContainer";

const Page: React.FC = () => {
    return (
        <main className="mx-auto max-w-3xl space-y-12 md:py-24">
            <div className="space-y-4">
                <div className="flex space-x-4 items-center my-5">
                    <Link href="https://github.com/iRevolutionDev" target="blank">
                        <FaGithub size={32}/>
                    </Link>
                    <Link href="https://www.linkedin.com/in/gustavo-daniel-87761518b" target="blank">
                        <FaLinkedin size={32}/>
                    </Link>
                    <CopyToClipboard text="RevolutionDev#490921">
                        <SiHackthebox size={32}/>
                    </CopyToClipboard>
                    <Link href="https://open.spotify.com/user/jcm4iped0mnqusg2cvq5hy26z" target="blank">
                        <FaSpotify size={32}/>
                    </Link>
                    <Link href="https://www.google.com/maps/place/S%C3%A3o+Paulo,+SP" target="blank">
                        <div className="inline-flex">
                            <div className="bg-dark-50 p-2 rounded-full flex items-center sm:space-x-2">
                                <TiLocation size={20}/>
                                <h1 className="">Brazil / São Paulo</h1>
                                <div className="bg-dark-100 rounded-full w-4 h-4 ml-2"></div>
                            </div>
                        </div>
                    </Link>
                </div>
                <h1 className="text-3xl font-bold sm:text-4xl md:text-7xl">Hello, I&apos;m <span
                    className="text-brand-name">Revolution</span> 👋</h1>
                <p className="opacity-60">
                    I am a software engineer, and I&apos;m passionate Reverse Engineering, C++, game development, and
                    web development.
                </p>
            </div>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold sm:text-3xl">Technologies 💻</h1>
                <p className="opacity-60">
                    I employ multiple tools during my development process to enhance the excellence of my code. The
                    following is a list of
                    technologies and languages that I have utilized in the past or am currently using.
                </p>
                <IconsContainer>
                    <IconsContainer.Icon Icon={SiCplusplus}/>
                    <IconsContainer.Icon Icon={SiCsharp}/>
                    <IconsContainer.Icon Icon={SiRust}/>
                    <IconsContainer.Icon Icon={SiFlutter}/>
                    <IconsContainer.Icon Icon={SiDart}/>
                    <IconsContainer.Icon Icon={SiPython}/>
                    <IconsContainer.Icon Icon={SiTypescript}/>
                    <IconsContainer.Icon Icon={SiJavascript}/>
                    <IconsContainer.Icon Icon={SiReact}/>
                    <IconsContainer.Icon Icon={SiTailwindcss}/>
                    <IconsContainer.Icon Icon={SiAndroidstudio}/>
                    <IconsContainer.Icon Icon={SiYarn}/>
                    <IconsContainer.Icon Icon={SiGit}/>
                </IconsContainer>
            </div>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold sm:text-3xl">Current Positions 💼</h1>
                <Card.Container>
                    <Card
                        title={"Katsuhiro"}
                        description={`
                            Katsuhiro is a software development company, specializing in high performance 
                            desktop and web applications.
                        `}
                        role={"Software Engineer - Junior"}
                    />
                    <Card
                        title={"Guarumidia"}
                        description={`
                            Guarumidia is a company that develops institutional websites 
                            and software for the city of Guarulhos.
                        `}
                        role={"Software Engineer - Junior"}
                    />
                </Card.Container>
            </div>
            <footer className="mx-auto mt-10 sm:-mt-10 max-w-3xl border-t-2 p-4 py-10 opacity-50 border-ctp-text/10">
                <h1 className="text-3xl font-bold text -mt-5">Revolution</h1>
                <p className="text-ctp-text/50">
                    © {new Date().getFullYear()} Revolution • Software Engineer • All rights reserved.
                </p>
            </footer>
        </main>
    )
}

export default Page;
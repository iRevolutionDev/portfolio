import {Divider, Stack, Typography} from "@mui/material";
import {SocialLinks} from "@/components/social-links";
import {Location} from "@/components/location-card/location-card";
import {TechnologyList} from "@/components/technology-list";
import {TitleWithColor} from "@/components/title-with-color";
import {JobDetailsCard} from "@/components/job-details-card";
import {LocationOn} from "@mui/icons-material";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Revolution @ Home",
    description: "Revolution is a software engineer, and he's passionate Reverse Engineering, C++, game development, and web development.",
    openGraph: {
        title: "Revolution @ Home",
        description: "Revolution is a software engineer, and he's passionate Reverse Engineering, C++, game development, and web development.",
    }
}

export default function Page() {
    return (
        <Stack direction="column" spacing={4}>
            <Stack direction="column" spacing={2}>
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} alignContent="center" alignItems="center">
                    <SocialLinks/>
                    <Location.Root href="https://www.google.com/maps/place/S%C3%A3o+Paulo,+State+of+S%C3%A3o+Paulo/">
                        <LocationOn fontSize="small"/>
                        <Typography variant="body1">
                            Brazil - São Paulo
                        </Typography>
                        <Location.Ping/>
                    </Location.Root>
                </Stack>
                <Stack direction="row" spacing={2} alignContent="center" alignItems="center">
                    <h3 className="text-4xl md:text-6xl font-bold">
                        Hello, I'm <br/>
                        <TitleWithColor>Revolution</TitleWithColor>.
                    </h3>
                    <h2 className="text-4xl md:text-6xl font-bold">👋</h2>
                </Stack>
                <Typography variant="body1" className="opacity-60">
                    I am a software engineer, and I'm passionate Reverse Engineering, C++, game development, and web
                    development.
                </Typography>
            </Stack>
            <Stack direction="column" spacing={2}>
                <Typography variant="h4" fontWeight={700}>Technologies 💻</Typography>
                <Typography variant="body1" className="opacity-60">
                    I employ multiple tools during my development process to enhance the excellence of my code. The
                    following is a list of technologies and languages that I have utilized in the past or am currently
                    using.
                </Typography>
                <TechnologyList/>
            </Stack>
            <Stack direction="column" spacing={2}>
                <Typography variant="h4" fontWeight={700}>Current Positions 💼</Typography>
                <JobDetailsCard.Root>
                    <JobDetailsCard.Item title="Katsuhiro" position="Software Engineer">
                        Katsuhiro is a software development company, specializing in high performance desktop and web
                        applications.
                    </JobDetailsCard.Item>
                    <JobDetailsCard.Item title="NovaLumina Studios" position="Software Engineer">
                        NovaLumina Studios is a game development company, specializing in high-quality games with a
                        focus on exploring
                        innovation and incorporating cutting-edge technologies.
                    </JobDetailsCard.Item>
                    <JobDetailsCard.Item title="Guarumidia" position="Software Engineer">
                        Guarumidia is a company that develops institutional websites and software for the city of
                        Guarulhos.
                    </JobDetailsCard.Item>
                </JobDetailsCard.Root>
            </Stack>
            <footer className="w-full">
                <Divider className="w-full" sx={{marginBottom: 2}}/>
                <Typography variant="h5" className="opacity-60" sx={{marginBottom: 1}}>
                    Revolution
                </Typography>
                <Typography variant="body1" className="opacity-60">
                    Made with ❤️ by Revolution © {new Date().getFullYear()} • Software Engineer • All rights reserved
                </Typography>
            </footer>
        </Stack>
    );
}
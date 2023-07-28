import {PropsWithChildren} from "react";
import {Container} from "@mui/material";
import Navbar from "@/templates/navbar/navbar";

export default function Layout({children}: PropsWithChildren<{}>) {
    return (
        <>
            <Navbar>
                <Navbar.Item>
                    /
                </Navbar.Item>
                <Navbar.Item>
                    ~/about
                </Navbar.Item>
                <Navbar.Item>
                    ~/projects
                </Navbar.Item>
            </Navbar>
            <Container maxWidth="md">
                {children}
            </Container>
        </>
    );
}
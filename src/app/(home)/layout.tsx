import {PropsWithChildren} from "react";
import {Container} from "@mui/material";
import Navbar from "@/templates/navbar/navbar";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <>
            <Container maxWidth="md">
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
                {children}
            </Container>
        </>
    );
}
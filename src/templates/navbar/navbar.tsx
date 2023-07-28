import {FC, PropsWithChildren} from "react";
import {Container, Grid, Stack, Toolbar} from "@mui/material";
import {NavButton} from "@/components/nav-button";
import {SpotifyWatcher} from "@/components/spotify-watcher";
import {AnimatedAppBar} from "@/components/animated-appbar";
import MobileMenu from "@/components/mobile-menu";
import MenuButton from "@/components/menu-button";

const Item = ({children}: PropsWithChildren) => {
    return (
        <li className="text-white list-none w-full md:w-auto">
            <NavButton>{children}</NavButton>
        </li>
    );
}

type Extensions = {
    Item: typeof Item;
}

const Navbar: FC<PropsWithChildren> & Extensions = ({children}) => {
    return (
        <>
            <Container maxWidth="md" className="!hidden md:!block">
                <div className="my-5">
                    <Stack direction="row">
                        <Stack direction="row" spacing={2}>
                            {children}
                        </Stack>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <SpotifyWatcher/>
                            </Grid>
                        </Grid>
                    </Stack>
                </div>
            </Container>
            <div className="md:hidden">
                <MobileMenu>
                    {children}
                </MobileMenu>
                <AnimatedAppBar>
                    <Toolbar>
                        <MenuButton/>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <SpotifyWatcher/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AnimatedAppBar>
            </div>
        </>
    );
}

Navbar.Item = Item;
export default Navbar;
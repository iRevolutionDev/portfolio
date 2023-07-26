import {FC, PropsWithChildren} from "react";
import {Grid, Stack} from "@mui/material";
import {NavButton} from "@/components/nav-button";

const Item = ({children}: PropsWithChildren) => {
    return (
        <li className="text-white list-none">
            <NavButton>{children}</NavButton>
        </li>
    );
}

type Extensions = {
    Item: typeof Item;
}

const Navbar: FC<PropsWithChildren> & Extensions = ({ children }) => {
    return (
        <div className="my-5">
            <Stack direction="row">
                <Stack direction="row" spacing={2}>
                    {children}
                </Stack>

                <Grid container justifyContent="flex-end">
                    <Grid item>

                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
}

Navbar.Item = Item;
export default Navbar;
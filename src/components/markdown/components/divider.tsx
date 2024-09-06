import type { DividerProps as MuiDividerProps } from "@mui/material";
import { Divider as MuiDivider } from "@mui/material";
import type { FC } from "react";

export interface DividerProps extends MuiDividerProps {}

export const Divider: FC<DividerProps> = (props) => <MuiDivider {...props} />;

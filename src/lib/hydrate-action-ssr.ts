import type { RootState } from "@/redux/store";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export function isHydrateAction(
	action: Action,
): action is PayloadAction<RootState> {
	return action.type === HYDRATE;
}

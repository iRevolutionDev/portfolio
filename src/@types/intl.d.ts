import type en from "../../locales/en.json";

type Messages = typeof en;

declare global {
	interface IntlMessages extends Messages {}
}

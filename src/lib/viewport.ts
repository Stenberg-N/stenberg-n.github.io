import { writable } from "svelte/store";

import { type ViewPort } from "./types";

export const viewport = writable<ViewPort>({ height: 0, width: 0 });
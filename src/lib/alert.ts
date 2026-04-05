import { writable } from "svelte/store";
import type { Alert } from "./types";

export const alerts = writable<Alert[]>([]);

let id = 0;

export const sendAlert = (
  message: string,
  isTimer: boolean,
  showButtons: boolean,
  link?: string | null,
  onCancel?: () => void
) => {
  const alert: Alert = {
    id: ++id,
    message,
    isTimer: isTimer,
    showButtons: showButtons,
    link: link || null,
    onCancel: onCancel || (() => {})
  };
  alerts.update((alerts) => [ ...alerts, alert ]);
};

export const closeAlert = (id: number) => alerts.update((alerts) => alerts.filter((alert) => alert.id !== id));
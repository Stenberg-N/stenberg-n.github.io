import { writable } from "svelte/store";
import type { Alert } from "./types";

export const alerts = writable<Alert[]>([]);

let id = 0;

export const sendAlert = (options: {
  message: string,
  isTimer: boolean,
  showButtons: boolean,
  link?: string | null,
  onCancel?: () => void
}) => {
  const alert: Alert = ({
    id: ++id,
    message: options.message,
    isTimer: options.isTimer,
    showButtons: options.showButtons,
    link: options.link || null,
    onCancel: options.onCancel || (() => {})
  });
  alerts.update((alerts) => [ ...alerts, alert ]);
};

export const closeAlert = (id: number) => alerts.update((alerts) => alerts.filter((alert) => alert.id !== id));
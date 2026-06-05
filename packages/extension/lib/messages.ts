/** Popup → content-script auto-fill request. */
export const FILL_MESSAGE = 'fakerjsui:fill';

export interface FillRequest {
  type: typeof FILL_MESSAGE;
}

export interface FillResponse {
  count: number;
}

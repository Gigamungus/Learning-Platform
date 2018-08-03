import { TOGGLE_SIDEBAR, RESET_PAGE } from ".";

export const toggleSidebarCreator = () => ({
  type: TOGGLE_SIDEBAR
});

export const resetHomeScreen = () => ({
  type: RESET_PAGE.HOMESCREEN
});

import {
  CHANGE_LAYOUT,
  TOGGLE_BOXED_LAYOUT,
  TOGGLE_COLLAPSED_NAV,
  TOGGLE_OFFCANVAS_NAV,
  TOGGLE_FIXED_SIDENAV,
  TOGGLE_FIXED_HEADER,
  CHANGE_SIDENAV_WIDTH,
  TOGGLE_OFFCANVAS_MOBILE_NAV,
  CHANGE_COLOR_OPTION,
  CHANGE_THEME,
  UPDATE_HEADER_PROFILE,
} from './types';

export const changeLayout = (layoutOption) => {
  return { type: CHANGE_LAYOUT, layoutOption };
};

export const toggleBoxedLayout = (isBoxedLayout) => {
  return { type: TOGGLE_BOXED_LAYOUT, isBoxedLayout: isBoxedLayout };
};

export const toggleCollapsedNav = (isCollapsedNav) => {
  return { type: TOGGLE_COLLAPSED_NAV, isCollapsedNav: isCollapsedNav };
};

export const toggleOffCanvasNav = (isOffCanvasNav) => {
  return { type: TOGGLE_OFFCANVAS_NAV, isOffCanvasNav: isOffCanvasNav };
};

export const toggleFixedSidenav = (isFixedSidenav) => {
  return { type: TOGGLE_FIXED_SIDENAV, isFixedSidenav: isFixedSidenav };
};

export const toggleFixedHeader = (isFixedHeader) => {
  return { type: TOGGLE_FIXED_HEADER, isFixedHeader: isFixedHeader };
};

export const changeSidenavWidth = (sidenavWidth) => {
  return { type: CHANGE_SIDENAV_WIDTH, sidenavWidth: sidenavWidth };
};

export const toggleOffCanvasMobileNav = (isOffCanvasMobileNav) => {
  return { type: TOGGLE_OFFCANVAS_MOBILE_NAV, isOffCanvasMobileNav: isOffCanvasMobileNav };
};

export const changeColorOption = (colorOption) => {
  return { type: CHANGE_COLOR_OPTION, colorOption: colorOption };
};

export const changeTheme = (themeOption) => {
  return { type: CHANGE_THEME, theme: themeOption };
};

export const updateUiHeader = (fullName, profilePicture) => {
  return { type: UPDATE_HEADER_PROFILE, payload: { fullName, profilePicture } };
};

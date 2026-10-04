export const THEME_KEY = "etb_theme";
export const THEMES = { light: "etuition", dark: "etuition-dark" };

export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark")t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t==="dark"?"${THEMES.dark}":"${THEMES.light}")}catch(e){}})()`;

export const readSessionToken = () => decodeURIComponent(window.location.hash.slice(1));

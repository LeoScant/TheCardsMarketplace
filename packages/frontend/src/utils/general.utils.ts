export const DEFAULT_IMAGE_URL = "https://i.pinimg.com/originals/ed/c7/c6/edc7c6437653ab73346c7bf08c884077.jpg";

export const isValidUrl = (url?: string) => {
    if(!url) return false;
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};
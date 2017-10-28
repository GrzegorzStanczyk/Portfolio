export interface Project {
    liveUrl: string;
    shortUrl: string;
    mobileView: boolean;
    mobileViewJPG: string;
    mobileViewWEBP: string;
    desktopView: boolean;
    desktopViewJPG: string;
    desktopViewWEBP: string;
    path: string,
    title: string,
    tech: Array<string>,
    desc: string,
    git: string 
};
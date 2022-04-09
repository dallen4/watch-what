import Bowser from 'bowser';

const getBrowser = () => Bowser.getParser(window.navigator.userAgent);

export function isDesktop(): boolean {
    return getBrowser().getPlatform().type === 'desktop';
}

export function isMobile(): boolean {
    return getBrowser().getPlatform().type === 'mobile';
}

export function isTablet(): boolean {
    return getBrowser().getPlatform().type === 'tablet';
}

export function isSafari(): boolean {
    return getBrowser().getBrowserName() === 'Safari';
}

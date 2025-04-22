import { computed, signal } from '@angular/core';

const getInitialDarkMode = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
};

export const isDarkMode = signal<boolean>(getInitialDarkMode());

export const themeClass = computed(() =>
    isDarkMode() ? 'dark-theme' : 'light-theme'
);
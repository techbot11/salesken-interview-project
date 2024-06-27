import { useState } from 'react';

export type DebouncePropType = {
    bounceDelay?: Number;
};

export type DebounceReturnType = {
    debounce: Function;
    isBouncing: boolean;
};

export const useDebounce = (
    options: DebouncePropType = {},
): DebounceReturnType => {
    const { bounceDelay = 2000 } = options;
    const [busy, setbusy] = useState(false);
    const debounce = (callback: Function): void => {
        setTimeout(() => {
            setbusy(false);
        }, Number(bounceDelay));

        if (!busy) {
            setbusy(true);
            callback();
        }
    };
    return { debounce, isBouncing: busy };
};

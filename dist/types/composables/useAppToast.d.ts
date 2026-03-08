export declare function useAppToast(): {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    warn: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
};

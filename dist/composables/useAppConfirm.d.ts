export declare function useAppConfirm(): {
    confirmDelete: (onAccept: () => void, message?: string) => void;
    confirmAction: (message: string, onAccept: () => void, header?: string) => void;
};

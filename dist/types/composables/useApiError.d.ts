export declare function extractApiError(error: unknown, fallback?: string): string;
export declare function useApiError(): {
    extractApiError: typeof extractApiError;
};

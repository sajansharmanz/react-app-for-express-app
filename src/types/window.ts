declare global {
    interface Window {
        axiosAbortController: AbortController | undefined;
    }
}

export default Window;

export const debounce = <T>(
    cb: (...args: any[]) => Promise<T> | T,
    wait: number,
) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: any[]): Promise<T> => {
        return new Promise((resolve) => {
            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                const result = await cb(...args);
                resolve(result);
            }, wait);
        });
    };
};

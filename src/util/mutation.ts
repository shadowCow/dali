
export function applyChanges<T extends any>(t: T, partial: Partial<T>): void {
    Object.entries(partial).forEach(([key, value]) => {
        t[key] = value;
    });
}

export function applyFractionalChanges<T extends any>(
    fraction: number,
    t: T,
    partial: Partial<T>,
): void {
    Object.entries(partial).forEach(([key, value]) => {
        if (key && value && typeof value === 'number') {
            const totalTargetChange = value - t[key];
            t[key] = t[key] + (fraction * totalTargetChange);
        }
    });
}

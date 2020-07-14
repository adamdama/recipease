export const prefixObjectKeys = (obj: Record<string, any>, prefix: string) =>
    Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [`${prefix}${key}`, value])
    );

import { customAlphabet } from "nanoid";

export const generateId = customAlphabet(
    "0123456789ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz",
    24
);

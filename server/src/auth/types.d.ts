export interface DecodedJwtUser {
    "https://recipease.com/email": string;
    iss: string;
    sub: string;
    aud: string[];
    iat: Number;
    exp: Number;
    azp: string;
    scope: string;
}

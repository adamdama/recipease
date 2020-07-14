import { Flavour } from "@/types/flavour";
import { DecodedJwtUser } from "./types.d";

export type UserId = Flavour<string, "User">;
export const USER_NODE_LABEL = "User";

export class User {
    readonly id: UserId;

    readonly email: string;

    constructor(decodedJwt: DecodedJwtUser) {
        this.id = decodedJwt.sub;
        this.email = decodedJwt["https://recipease.com/email"];
    }
}

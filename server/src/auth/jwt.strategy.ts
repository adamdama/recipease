import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { passportJwtSecret } from "jwks-rsa";

// Ref: https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/#Set-Up-API-Authorization

const {
    AUTH0_AUDIENCE: auth0Audience,
    AUTH0_DOMAIN: auth0Domain
} = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${auth0Domain}.well-known/jwks.json`
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: auth0Audience,
            issuer: auth0Domain,
            algorithms: ["RS256"]
        });
    }

    async validate(payload: any) {
        return payload;
    }
}

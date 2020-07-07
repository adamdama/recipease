import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "./user.model";

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): User => {
        const ctx = GqlExecutionContext.create(context);
        return new User(ctx.getContext().req.user);
    }
);

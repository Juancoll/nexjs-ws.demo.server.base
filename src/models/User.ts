import { IncludeModel } from '@nexjs/wsserver'

@IncludeModel
export class User {
    email: string;
    password?: string;
    roles: string[];
}


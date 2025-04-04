import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, NotEquals, validateSync } from "class-validator";

class Env {
  @IsString()
  @IsNotEmpty()
  dbURL: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  dbURL: process.env.DATABASE_URL,
});

const erros = validateSync(env);

if (erros.length > 0) {
  throw new Error( `${JSON.stringify(erros, null, 2)}`);
}
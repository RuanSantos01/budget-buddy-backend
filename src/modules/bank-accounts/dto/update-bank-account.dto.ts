import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class UpdateBankAccountDto {

    @IsOptional()
    @IsString()
    bankIspbId: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    balance: number;

}

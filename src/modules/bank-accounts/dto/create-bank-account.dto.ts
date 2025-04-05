import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateBankAccountDto {

    @IsNotEmpty()
    @IsString()
    bankIspbId: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    balance: number;

}

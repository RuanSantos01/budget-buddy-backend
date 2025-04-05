import { Decimal } from "@prisma/client/runtime/library";

export class ValueUtils {

    static convertValue(value: number): string {
        return new Decimal(value).div(100).toFixed(2);
    }

}
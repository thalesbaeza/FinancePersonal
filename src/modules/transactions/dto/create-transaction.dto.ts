export class CreateTransactionDto {
    readonly id: Number;
    readonly date: Date;
    readonly title: String;
    readonly place: String;
    readonly amount: Number;
    readonly expenses: String;
    readonly bank: String;
    readonly type: String;
}
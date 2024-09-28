import { default as authRouter } from "./auth.route";
import { default as transactionRouter } from "./transaction.route";
import { default as itemRouter } from "./item.route";
import { default as customerRouter } from "./customer.route";

export default [authRouter, transactionRouter, itemRouter, customerRouter];

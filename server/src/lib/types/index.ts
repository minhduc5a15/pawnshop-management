export * from "./request";

// Kiểu dữ liệu Khách hàng (Customer)
export interface CustomerProps {
    id: string;
    name: string;
    phoneNumber: string;
    address?: string;
    email?: string;
    transactionIds: string[];
    createdAt: Date;
    gender?: "male" | "female";
};

// Kiểu dữ liệu Giao dịch (Transaction)
export interface TransactionProps {
    id: string; // Mã định danh giao dịch
    customerId: string; // Mã định danh khách hàng
    pawnedItemId: string; // Mã định danh tài sản liên quan
    type: "pawn" | "interest_payment" | "redemption"; // Loại giao dịch (cầm cố, trả lãi, chuộc tài sản)
    amount: number; // Số tiền giao dịch (ví dụ, số tiền vay hoặc số tiền trả lãi)
    date: Date; // Ngày thực hiện giao dịch
};

// Kiểu dữ liệu Tài sản cầm cố (PawnedItem)
export interface ItemProps {
    id: string;
    name: string; // tên tài sản
    description?: string;
    value: number; // giá trị tài sản (VNĐ)
    pawnedAmount: number; // // số tiền khách hàng nhận được khi cầm cố (VNĐ)
    pawnedDate: Date; // ngày cầm cố
    redemptionDate?: Date; // ngày chuộc tài sản và trả lãi, có thể không bắt buộc
    interestRate: number; // lãi suất cầm cố, mặc định là 5%/tháng, lãi đơn
    customerId: string;
    status: "active" | "redeemed"; // Trạng thái tài sản (đang cầm cố hoặc đã chuộc)
};

// Kiểu dữ liệu Báo cáo tài chính (FinancialReport)
export type FinancialReport = {
    id: string;
    month: number; // báo cáo theo tháng
    year: number; // báo cáo theo năm
    totalRevenue: number; // Tổng thu nhập trong kỳ
    totalInterest: number; // Tổng tiền lãi trong kỳ
    totalPawnedItems: number; // Số lượng tài sản đang cầm cố
    totalRedemptions: number; // Số lượng tài sản đã chuộc
};

export type UserAuthentication = {
    id: string;
    username: string;
    email: string;
    gender?: "male" | "female";
    [key: string]: unknown;
};

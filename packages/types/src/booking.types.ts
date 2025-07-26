export interface Booking {
    id: string;
    userId: string;
    date: string;
    status: "pending" | "confirmed" | "cancelled";
}

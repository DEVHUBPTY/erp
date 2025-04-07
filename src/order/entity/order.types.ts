export enum OrderStatus {
    PENDING = 'PENDIENTE',
    CONFIRMED = 'CONFIRMADO',
    PREPARING = 'PREPARANDO',
    COMPLETED = 'COMPLETADA',
    CANCELLED = 'CANCELADA',
}

export enum PriceStatus {
    CURRENT = 'ACTUAL',
    PROMOTION = 'PROMOCION',
    NEGOTIABLE = 'NEGOCIABLE',
}

export enum PaymentMethod {
    CASH = 'Efectivo',
    TRANSFER = 'Transferencia',
}

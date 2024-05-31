export enum EPaymentStatus {
    unknown = 0,
    created = 1,
    pending = 2,
    canceled = 3,
    confirmed = 4,
    withdrawn = 5,
    rejected = 6,
    waiting_for_clearance = 7,
    cleared = 8,
    processing_refund = 9,
    refunded = 10
}

export enum ECurrency {
    CZK = 'CZK',
    EUR = 'EUR',
    USD = 'USD',
    GBP = 'GBP',
    HUF = 'HUF',
    PLN = 'PLN',
    RON = 'RON',
    NOK = 'NOK',
    SEK = 'SEK'
}

export enum EReturnMethod {
    POST = 'POST',
    GET = 'GET'
}

export enum ERedirectMethod {
    POST = 'POST',
    GET = 'GET'
}

export enum ELoginAuth {
    guest = 'guest',
    account = 'account',
    federated = 'federated',
    issuer = 'issuer',
    thirdparty = 'thirdparty',
    fido = 'fido',
    fido_signed = 'fido_signed',
    api = 'api'
}

export enum EOrderType {
    purchase = 'purchase',
    balance = 'balance',
    prepaid = 'prepaid',
    cash = 'cash',
    check = 'check'
}

export enum EOrderAvailability {
    now = 'now',
    preorder = 'preorder'
}

export enum EOrderDelivery {
    shipping = 'shipping',
    shipping_verified = 'shipping_verified',
    instore = 'instore',
    digital = 'digital',
    ticket = 'ticket',
    other = 'other'
}

export enum EOrderDeliveryType {
    DELIVERY_CARRIER = 'DELIVERY_CARRIER',
    PERSONAL_BRANCH = 'PERSONAL_BRANCH',
    PERSONAL_PARTNER = 'PERSONAL_PARTNER',
    ONLINE = 'ONLINE'
}

export type EOrderDeliveryMode = '0' | '1' | '2' | '3'; // 0 - electronic, 1 - same day, 2 - next day, 3 - two or more days

export enum ELanguage {
    cs = 'cs',
    en = 'en',
    de = 'de',
    fr = 'fr',
    hu = 'hu',
    it = 'it',
    ja = 'ja',
    pl = 'pl',
    pt = 'pt',
    ro = 'ro',
    ru = 'ru',
    sk = 'sk',
    es = 'es',
    tr = 'tr',
    vi = 'vi',
    hr = 'hr',
    sl = 'sl',
    sv = 'sv'
}

export enum EPayOperation {
    payment = 'payment',
    oneclickpayment = 'oneclickPayment',
    custompayment = 'customPayment'
}

export enum EPayMethod {
    card = 'card',
    cardLVP = 'card#LVP'
}

export enum ECarrierId {
    CZ_POST_HAND = 'CZ_POST_HAND',
    CZ_POST_OFFICE = 'CZ_POST_OFFICE',
    CZ_POST_OTHER = 'CZ_POST_OTHER',
    PPL = 'PPL',
    DPD = 'DPD',
    GEIS = 'GEIS',
    IN_TIME = 'IN_TIME',
    TOP_TRANS = 'TOP_TRANS',
    GEBRUDER_WEISS = 'GEBRUDER_WEISS',
    LOCAL_COURIER = 'LOCAL_COURIER',
    TNT = 'TNT',
    GLS = 'GLS',
    HDS_COMFORT = 'HDS_COMFORT',
    HDS_STANDARD = 'HDS_STANDARD',
    MALL_DEPOSIT = 'MALL_DEPOSIT'
}

export enum EItemType {
    PHYSICAL = 'PHYSICAL',
    DISCOUNT = 'DISCOUNT',
    DIGITAL = 'DIGITAL',
    GIFT_CARD = 'GIFT_CARD',
    STORE_CREDIT = 'STORE_CREDIT',
    SALES_TAX = 'SALES_TAX',
    SHIPPING_FEE = 'SHIPPING_FEE',
    INSURANCE = 'INSURANCE',
    FEE = 'FEE'
}

export enum EAddressType {
    DELIVERY = 'DELIVERY',
    BILLING = 'BILLING'
}

export enum ELogisticsEvent {
    delivered = 'delivered',
    sent = 'sent'
}

export enum ECancelReason {
    aborted = 'aborted',
    other_payment = 'other_payment',
    undeliverable = 'undeliverable',
    unavailable = 'unavailable',
    abandoned = 'abandoned',
    changed = 'changed',
    unprocessed = 'unprocessed'
}

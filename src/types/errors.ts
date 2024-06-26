export enum PaymentErrors {
    missing_parameters = 'E_MISSING_PARAMETERS',
    invalid_parameters = 'E_INVALID_PARAMETERS',
    merchant_blocked = 'E_MERCHANT_BLOCKED',
    session_expired = 'E_SESSION_EXPIRED',
    payment_not_found = 'E_PAYMENT_NOT_FOUND',
    payment_not_in_valid_state = 'E_PAYMENT_NOT_IN_VALID_STATE',
    payment_method_disabled = 'E_PAYMENT_METHOD_DISABLED',
    payment_method_unavailable = 'E_PAYMENT_METHOD_UNAVAILABLE',
    operation_not_allowed = 'E_OPERATION_NOT_ALLOWED',
    payment_method_error = 'E_PAYMENT_METHOD_ERROR',
    duplicate_purchase_id = 'E_DUPLICATE_PURCHASE_ID',
    merchant_not_onboarded_for_masterpass = 'E_MERCHANT_NOT_ONBOARDED_FOR_MASTERPASS',
    masterpass_request_token_already_initialized = 'E_MASTERPASS_REQUEST_TOKEN_ALREADY_INITIALIZED',
    masterpass_request_does_not_exist = 'E_MASTERPASS_REQUEST_DOES_NOT_EXIST',
    masterpass_canceled_by_user = 'E_MASTERPASS_CANCELED_BY_USER',
    eet_rejected = 'E_EET_REJECTED',
    mallpay_payment_declined_in_precheck = 'E_MALLPAY_PAYMENT_DECLINED_IN_PRECHECK',
    oneclick_template_not_found = 'E_ONECLICK_TEMPLATE_NOT_FOUND',
    oneclick_template_payment_expired = 'E_ONECLICK_TEMPLATE_PAYMENT_EXPIRED',
    oneclick_template_card_expired = 'E_ONECLICK_TEMPLATE_CARD_EXPIRED',
    oneclick_template_customer_rejected = 'E_ONECLICK_TEMPLATE_CUSTOMER_REJECTED',
    oneclick_template_payment_reversed = 'E_ONECLICK_TEMPLATE_PAYMENT_REVERSED',
    cardholder_account_closed = 'E_CARDHOLDER_ACCOUNT_CLOSED',
    customer_not_found = 'E_CUSTOMER_NOT_FOUND',
    customer_found_no_saved_cards = 'E_CUSTOMER_FOUND_NO_SAVED_CARDS',
    customer_found_found_saved_cards = 'E_CUSTOMER_FOUND_FOUND_SAVED_CARDS',
    internal_error = 'E_INTERNAL_ERROR'
}

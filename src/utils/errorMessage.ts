import { PaymentErrors } from '../types/errors';

export default function getErrorMessage(code: number): 'OK' | PaymentErrors {
    switch (String(code)) {
        case '0':
            return 'OK';
        case '100':
            return PaymentErrors.missing_parameters;
        case '110':
            return PaymentErrors.invalid_parameters;
        case '120':
            return PaymentErrors.merchant_blocked;
        case '130':
            return PaymentErrors.session_expired;
        case '140':
            return PaymentErrors.payment_not_found;
        case '150':
            return PaymentErrors.payment_not_in_valid_state;
        case '160':
            return PaymentErrors.payment_method_disabled;
        case '170':
            return PaymentErrors.payment_method_unavailable;
        case '180':
            return PaymentErrors.operation_not_allowed;
        case '190':
            return PaymentErrors.payment_method_error;
        case '200':
            return PaymentErrors.duplicate_purchase_id;
        case '230':
            return PaymentErrors.merchant_not_onboarded_for_masterpass;
        case '240':
            return PaymentErrors.masterpass_request_token_already_initialized;
        case '250':
            return PaymentErrors.masterpass_request_does_not_exist;
        case '270':
            return PaymentErrors.masterpass_canceled_by_user;
        case '500':
            return PaymentErrors.eet_rejected;
        case '600':
            return PaymentErrors.mallpay_payment_declined_in_precheck;
        case '700':
            return PaymentErrors.oneclick_template_not_found;
        case '710':
            return PaymentErrors.oneclick_template_payment_expired;
        case '720':
            return PaymentErrors.oneclick_template_card_expired;
        case '730':
            return PaymentErrors.oneclick_template_customer_rejected;
        case '740':
            return PaymentErrors.oneclick_template_payment_reversed;
        case '750':
            return PaymentErrors.cardholder_account_closed;
        case '800':
            return PaymentErrors.customer_not_found;
        case '810':
            return PaymentErrors.customer_found_no_saved_cards;
        case '820':
            return PaymentErrors.customer_found_found_saved_cards;
        case '900':
            return PaymentErrors.internal_error;
        default:
            return PaymentErrors.internal_error;
    }
}

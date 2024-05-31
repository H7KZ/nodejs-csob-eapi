import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { ICSOBGetPaymentStatusResponse } from '../../types/csob/reponses';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function getCSOBPaymentStatus(payId: string, csob: CSOB): Promise<ICSOBGetPaymentStatusResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime()
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.get(
        `${csob.gateUrl}/payment/status/${encodeURIComponent(request.merchantId)}/${encodeURIComponent(payId)}/${encodeURIComponent(
            request.dttm
        )}/${encodeURIComponent(signature)}`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(res => {
            const data = res.data as ICSOBGetPaymentStatusResponse;

            const { 'signature': _, ...response } = data;

            const verify = csob.verifyData(
                Object.values(flattenObject(response))
                    .filter(v => v !== undefined)
                    .join('|'),
                data.signature ?? ''
            );

            return {
                ...data,
                verified: verify
            } as ICSOBGetPaymentStatusResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}

import Axios from 'axios';
import type { CSOB } from '../..';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function getCSOBPaymentProcess(payId: string, csob: CSOB): Promise<string> {
    const request = {
        merchantId: csob.merchantId,
        payId,
        dttm: getCurrentDateTime()
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.get(
        `${csob.gateUrl}/payment/process/${encodeURIComponent(request.merchantId)}/${encodeURIComponent(payId)}/${encodeURIComponent(
            request.dttm
        )}/${encodeURIComponent(signature)}`,
        {
            maxRedirects: 0,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(() => {
            return '';
        })
        .catch(err => {
            console.error(err);

            if (err.response && [301, 302, 303, 307, 308].includes(err.response.status)) {
                return err.response.headers.location;
            }

            return '';
        });
}

import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IGooglePayInitResponse } from '../../types/googlepay/reponses';
import type { IGooglePayInitRequest } from '../../types/googlepay/requests';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postGooglePayInit(orderNo: number, data: IGooglePayInitRequest, csob: CSOB): Promise<IGooglePayInitResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        orderNo,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/googlepay/init`,
        {
            ...request,
            signature
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(res => {
            const data = res.data as IGooglePayInitResponse;

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
            } as IGooglePayInitResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}

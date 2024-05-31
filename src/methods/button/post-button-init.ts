import Axios, { type AxiosError } from 'axios';
import type { CSOB } from '../..';
import type { IButtonInitResponse } from '../../types/button/reponses';
import type { IButtonInitRequest } from '../../types/button/requests';
import flattenObject from '../../utils/flattenObject.util';
import getCurrentDateTime from '../../utils/time.util';

export default async function postButtonInit(orderNo: number, data: IButtonInitRequest, csob: CSOB): Promise<IButtonInitResponse | AxiosError> {
    const request = {
        merchantId: csob.merchantId,
        orderNo,
        dttm: getCurrentDateTime(),
        ...data
    };

    const signature = csob.signData(Object.values(flattenObject(request)).join('|'));

    return await Axios.post(
        `${csob.gateUrl}/button/init`,
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
            const data = res.data as IButtonInitResponse;

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
            } as IButtonInitResponse;
        })
        .catch(err => {
            console.error(err);
            return err as AxiosError;
        });
}

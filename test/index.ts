import CSOB from '../build/index';

const csob = new CSOB({
    gateUrl: "",
    merchantId: '00000000',
    privateKey: "",
    publicKey: ""
});

csob.getCSOBPaymentEcho().then((response) => {
    console.log(response);
});

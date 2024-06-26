import ADCB from "../../asset/images/adcb.webp";
import ANGELONE from "../../asset/images/angelone.webp";
import AXIS from "../../asset/images/axis.webp";
import BHIM from "../../asset/images/bhim.webp";
import CANARA from "../../asset/images/canara.webp";
import CRED from "../../asset/images/cred.webp";
import GPAY from "../../asset/images/gpay.webp";
import GROWW from "../../asset/images/groww.webp";
import HERE from "../../asset/images/here.webp";
import ICICI from "../../asset/images/icici.webp";
import PAYTM from "../../asset/images/paytm.webp";
import PHARMEASY from "../../asset/images/pharmeasy.webp";
import PHONEPE from "../../asset/images/phonepe.webp";
import SBI from "../../asset/images/sbi.webp";
import SLICE from "../../asset/images/slice.webp";

const token = localStorage.getItem("Token");

export const header = {
    'Authorization': `Bearer ${token}`,
}

export const imageHeader = {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
}

export const logos = [
    {
        name: "ADCB mBanking",
        url: ADCB
    },
    {
        name: "Angel One",
        url: ANGELONE
    },
    {
        name: "Axis Mobile",
        url: AXIS
    },
    {
        name: "BHIM",
        url: BHIM
    },
    {
        name: "Canara ai1",
        url: CANARA
    },
    {
        name: "CRED",
        url: CRED
    },
    {
        name: "Google Play",
        url: GPAY
    },
    {
        name: "Groww",
        url: GROWW
    },
    {
        name: "Here",
        url: HERE
    },
    {
        name: "iMobile Pay",
        url: ICICI
    },
    {
        name: "Paytm",
        url: PAYTM
    },
    {
        name: "PharmEasy",
        url: PHARMEASY
    },
    {
        name: "PhonePe",
        url: PHONEPE
    },
    {
        name: "Yono Lite SBI",
        url: SBI
    },
    {
        name: "slice",
        url: SLICE
    },
]
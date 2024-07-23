import ADCB from "../../asset/images/logos/adcb.webp";
import ANGELONE from "../../asset/images/logos/angelone.webp";
import AXIS from "../../asset/images/logos/axis.webp";
import BHIM from "../../asset/images/logos/bhim.webp";
import CANARA from "../../asset/images/logos/canara.webp";
import CRED from "../../asset/images/logos/cred.webp";
import GPAY from "../../asset/images/logos/gpay.webp";
import GROWW from "../../asset/images/logos/groww.webp";
import HERE from "../../asset/images/logos/here.webp";
import ICICI from "../../asset/images/logos/icici.webp";
import PAYTM from "../../asset/images/logos/paytm.webp";
import PHARMEASY from "../../asset/images/logos/pharmeasy.webp";
import PHONEPE from "../../asset/images/logos/phonepe.webp";
import SBI from "../../asset/images/logos/sbi.webp";
import SLICE from "../../asset/images/logos/slice.webp";
import ADCB_mBanking_RBI058 from "../../asset/images/proofs/adcb1.webp";

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

export const proofs = [
    {
        id: "ADCB_mBanking_RBI058",
        url: ADCB_mBanking_RBI058
    }
]
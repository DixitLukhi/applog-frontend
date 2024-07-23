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
import ADCB_MBANKING_RBI031 from "../../asset/images/proofs/ADCB_mBanking_RBI031.webp";
import ADCB_MBANKING_RBI058 from "../../asset/images/proofs/ADCB_mBanking_RBI058.webp";
import ADCB_MBANKING_RBI063 from "../../asset/images/proofs/ADCB_mBanking_RBI063.webp";
import ADCB_MBANKING_RBI064 from "../../asset/images/proofs/ADCB_mBanking_RBI064.webp";
import ANGEL_ONE_RBI031 from "../../asset/images/proofs/Angel_One_RBI031.webp";
import ANGEL_ONE_RBI064 from "../../asset/images/proofs/Angel_One_RBI064.webp";
import AXIS_MOBILE_RBI058 from "../../asset/images/proofs/Axis_Mobile_RBI058.webp";
import BHIM_RBI058 from "../../asset/images/proofs/BHIM_RBI058.webp";
import CANARA_AI1_RBI058 from "../../asset/images/proofs/Canara_ai1_RBI058.webp";
import CRED_RBI063 from "../../asset/images/proofs/CRED_RBI063.webp";
import CRED_RBI064 from "../../asset/images/proofs/CRED_RBI064.webp";
import HERE_RBI058 from "../../asset/images/proofs/HERE_RBI058.webp";
import IMOBILE_PAY_RBI058 from "../../asset/images/proofs/iMobile_Pay_RBI058.webp";
import IMUTHOOT_RBI058 from "../../asset/images/proofs/iMuthoot_RBI058.webp";
import KOTAK_MOBILE_BANKING_APP_RBI058 from "../../asset/images/proofs/Kotak_Mobile_Banking_App_RBI058.webp";
import PAYTM_RBI058 from "../../asset/images/proofs/Paytm_RBI058.webp";
import PHARMEASY_RBI031 from "../../asset/images/proofs/PharmEasy_RBI031.webp";
import PHARMEASY_RBI058 from "../../asset/images/proofs/PharmEasy_RBI058.webp";
import PHARMEASY_RBI063 from "../../asset/images/proofs/PharmEasy_RBI063.webp";
import PHARMEASY_RBI064 from "../../asset/images/proofs/PharmEasy_RBI064.webp";
import PHONEPE_RBI031 from "../../asset/images/proofs/PhonePe_RBI031.webp";
import PHONEPE_RBI063 from "../../asset/images/proofs/PhonePe_RBI063.webp";
import PHONEPE_RBI064 from "../../asset/images/proofs/PhonePe_RBI064.webp";
import SLICE_RBI031 from "../../asset/images/proofs/slice_RBI031.webp";
import YONO_LITE_SBI_RBI058 from "../../asset/images/proofs/Yono_Lite_SBI_RBI058.webp";
import YONO_LITE_SBI_RBI063 from "../../asset/images/proofs/Yono_Lite_SBI_RBI063.webp";
import YONO_LITE_SBI_RBI064 from "../../asset/images/proofs/Yono_Lite_SBI_RBI064.webp";
import ZERODHA_KITE_TRADE_AND_INVEST_RBI058 from "../../asset/images/proofs/Zerodha_Kite_Trade_And_Invest_RBI058.webp";

const token = localStorage.getItem("Token");

export const header = {
    'Authorization': `Bearer ${token}`,
}

export const imageHeader = {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
}

export const logos = [{
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
        id: "ADCB_MBANKING_RBI031",
        url: ADCB_MBANKING_RBI031
    },
    {
        id: "IMOBILE_PAY_RBI058",
        url: IMOBILE_PAY_RBI058
    },
    {
        id: "ADCB_MBANKING_RBI058",
        url: ADCB_MBANKING_RBI058
    },
    {
        id: "ADCB_MBANKING_RBI063",
        url: ADCB_MBANKING_RBI063
    },
    {
        id: "ADCB_MBANKING_RBI064",
        url: ADCB_MBANKING_RBI064
    },
    {
        id: "ANGEL_ONE_RBI031",
        url: ANGEL_ONE_RBI031
    },
    {
        id: "ANGEL_ONE_RBI064",
        url: ANGEL_ONE_RBI064
    },
    {
        id: "AXIS_MOBILE_RBI058",
        url: AXIS_MOBILE_RBI058
    },
    {
        id: "BHIM_RBI058",
        url: BHIM_RBI058
    },
    {
        id: "CANARA_AI1_RBI058",
        url: CANARA_AI1_RBI058
    },
    {
        id: "CRED_RBI063",
        url: CRED_RBI063
    },
    {
        id: "CRED_RBI064",
        url: CRED_RBI064
    },
    {
        id: "HERE_RBI058",
        url: HERE_RBI058
    },
    {
        id: "IMUTHOOT_RBI058",
        url: IMUTHOOT_RBI058
    },
    {
        id: "KOTAK_MOBILE_BANKING_APP_RBI058",
        url: KOTAK_MOBILE_BANKING_APP_RBI058
    },
    {
        id: "PAYTM_RBI058",
        url: PAYTM_RBI058
    },
    {
        id: "PHARMEASY_RBI031",
        url: PHARMEASY_RBI031
    },
    {
        id: "PHARMEASY_RBI058",
        url: PHARMEASY_RBI058
    },
    {
        id: "PHARMEASY_RBI063",
        url: PHARMEASY_RBI063
    },
    {
        id: "PHARMEASY_RBI064",
        url: PHARMEASY_RBI064
    },
    {
        id: "PHONEPE_RBI031",
        url: PHONEPE_RBI031
    },
    {
        id: "PHONEPE_RBI063",
        url: PHONEPE_RBI063
    },
    {
        id: "PHONEPE_RBI064",
        url: PHONEPE_RBI064
    },
    {
        id: "SLICE_RBI031",
        url: SLICE_RBI031
    },
    {
        id: "YONO_LITE_SBI_RBI058",
        url: YONO_LITE_SBI_RBI058
    },
    {
        id: "YONO_LITE_SBI_RBI063",
        url: YONO_LITE_SBI_RBI063
    },
    {
        id: "YONO_LITE_SBI_RBI064",
        url: YONO_LITE_SBI_RBI064
    },
    {
        id: "ZERODHA_KITE_TRADE_AND_INVEST_RBI058",
        url: ZERODHA_KITE_TRADE_AND_INVEST_RBI058
    }
];

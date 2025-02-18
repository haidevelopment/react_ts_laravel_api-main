import instance from "../../utils/Requests/instance";

interface bank {
    bank_code:string;
    amount:number;
}
export const VNPayAPI = async(data:bank)=>{
   const res = await instance.post('/payment/vnpay',data);
   return res.data;
}
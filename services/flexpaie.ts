/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import axiosInstance from "./axios";
const token = process.env.NEXT_PUBLIC_FLEXPAY_TOKEN;
const regex = /0/gi;

export const flexpaiePayment = async (dto: { [key: string]: string | number }) => {
  let formatedPhoneNumber = null;

  if ((dto.phone as any)[0] == 0) {
    formatedPhoneNumber = (dto.phone as any)[0].replace(regex, 243) + (dto.phone as any).slice(1);
  } else {
    formatedPhoneNumber = (dto.phone as any);
  }
  const { data } = await axiosInstance.post('/donate/flexpaie', {
    ...dto,
    phone: formatedPhoneNumber
  })
  const url = process.env.NEXT_PUBLIC_FLEX_PAY_BACKEND_URL;

  const flexpaieDto = {
    "merchant": "GO_FREELANCE",
    "type": 1,
    "phone": formatedPhoneNumber,
    "reference": data.reference,
    "amount": dto.amount,
    "currency": "USD",
    "callbackUrl": `${process.env.NEXT_PUBLIC_API_URL}/donate/flexpaie-webhook`
  };
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await axios.post(url ?? '', flexpaieDto, options)
    console.log(response)
    if (response.status >= 400) {
      return false
    }
    if (response.data.code == 1) {
      return false
    }
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

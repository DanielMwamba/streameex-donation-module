import axiosInstance from "./axios";

export const createDonation = async (dto: { [key: string]: string | number }) => {
  try {
    const { data } = await axiosInstance.post('/donate/flexpaie', {
      ...dto,
    })
    return data;
  } catch(e) {
    console.log(e)
    return null
  }
}
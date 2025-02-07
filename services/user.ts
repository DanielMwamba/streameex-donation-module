import axiosInstance from "./axios"

export const createUser = async (dto: {[key: string]: string}) => {
  try {
    const res = await axiosInstance({
      method: "POST",
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password: dto.password,
        password_confirmation: dto.password_confirmation
      }
    })
    return res
  } catch (error) {
    console.log(error)
    return null
  }
}

import axios from "axios"

export const createUser = async (dto: any) => {
  try {
    let res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
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

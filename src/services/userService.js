import Axios from "./customer-axios";

export const signUpApi = async ({
  userName,
  shopName,
  phoneNumber,
  password,
  confirmPassword,
  email,
  address,
  wards,
  district,
  province,
  acceptTerm,
}) => {
  try {
    const res = await Axios.post(`ExamUser/register-user `, {
      userName,
      shopName,
      phoneNumber,
      password,
      confirmPassword,
      email,
      address,
      wards,
      district,
      province,
      acceptTerm,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.errors.UserName);
  }
};

export const signInApi = async ({ userName, password }) => {
  try {
    const res = await Axios.post(`ExamUser/login`, {
      userName,
      password,
    });
    return res.data.content;
  } catch (error) {
    throw Error(error.response.data.errors.UserName);
  }
};

export const getOptChangePs = async (userName) => {
  try {
    const res = await Axios.get(
      `ExamUser/get-otp-change-password?userName=${userName}`
    );
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};

export const validateOtp = async ({ userName, otpCode }) => {
  try {
    const res = await Axios.get(
      `ExamUser/validate-otp-change-password?userName=${userName}&otpCode=${otpCode}`
    );
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};

export const changePassword = async ({
  userName,
  otpCode,
  password,
  confirmPassword,
}) => {
  try {
    const res = await Axios.post(`ExamUser/change-password`, {
      userName,
      otpCode,
      password,
      confirmPassword,
    });
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};

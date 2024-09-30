export const sendOtp = async (phoneNumber) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const message = `Your verification code is: ${otp}`;

    const requestBody = {
      username: waUser,
      password: waPass,
      receiverMobileNo: phoneNumber,
      message: message,
    };

    const response = await fetch(waUrl + "api/v1/message/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error sending OTP: ${errorMessage}`);
    }

    const data = await response.json();

    return {
      success: true,
      otp,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

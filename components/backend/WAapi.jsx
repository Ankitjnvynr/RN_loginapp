const waUrl = process.env.EXPO_PUBLIC_API_WA;
const waUser = process.env.EXPO_PUBLIC_WA_USER;
const waPass = process.env.EXPO_PUBLIC_WAKEY;

export const sendOtp = async (phoneNumber) => {
  try {
    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const message = `Your verification code is: ${otp}`;

    // Prepare the request body
    const requestBody = {
      user: waUser,
      pass: waPass,
      to: phoneNumber,
      message: message,
    };

    // Send the OTP via WhatsApp API
    const response = await fetch(waUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error sending OTP: ${errorMessage}`);
    }

    // Parse the response to JSON
    const data = await response.json();

    // Return the data for further action (e.g., handling success or failure)
    return {
      success: true,
      otp, // Return the generated OTP if needed
      data, // Return the API response data
    };
  } catch (error) {
    // Handle errors (e.g., network issues, API errors)
    return {
      success: false,
      error: error.message,
    };
  }
};

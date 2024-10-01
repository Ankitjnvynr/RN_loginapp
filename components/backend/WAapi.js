const apiUrl = "https://app.jflindia.co.in/api/v1/message/create"; // API endpoint
const apiUser = process.env.EXPO_PUBLIC_WA_USER; // Your API username
const apikey = process.env.EXPO_PUBLIC_WAKEY; // Your API key or token

export const sendOtp = async (phoneNumber) => {
  try {
    // Validate phone number format (basic regex check)
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phoneNumber)) {
      throw new Error("Invalid phone number format.");
    }

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const message = `Your verification code is: ${otp}`;

    // Construct the query parameters for the GET request
    const queryParams = new URLSearchParams({
      username: apiUser,
      password: apikey, // You might not need both username and password if using a token
      receiverMobileNo: phoneNumber,
      message: message,
    });

    // Log the full API URL with query parameters for debugging
    const fullUrl = `${apiUrl}?${queryParams.toString()}`;
    console.log("Full API URL:", fullUrl);

    // Send the GET request to the API
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",        // Expecting JSON response
        "Authorization": `Bearer ${apikey}`, // Add Authorization (Bearer or Basic as per API)
        "Host": "app.jflindia.co.in",        // Explicitly set the Host header if required
        // You may also add the Origin header if the API requires it
        // "Origin": "your-origin-here",
      },
    }).catch((networkError) => {
      // Handle fetch-level errors (like no internet)
      console.error("Network Error:", networkError);
      throw new Error("Network error occurred while sending OTP.");
    });

    // Log response status and headers
    console.log("Response Status:", response.status);
    console.log("Response Headers:", JSON.stringify([...response.headers]));

    // Get the response text
    const responseText = await response.text();
    console.log("Response Text:", responseText);

    // Check if the response is okay (2xx status codes)
    if (!response.ok) {
      console.error("Detailed Error Response:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText,
      });
      throw new Error(`Error sending OTP: ${responseText}`);
    }

    // Check content type for JSON
    const contentType = response.headers.get("Content-Type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = JSON.parse(responseText); // Parse JSON response
    } else {
      throw new Error(`Unexpected content type: ${contentType}`);
    }

    // Return success response
    return {
      success: true,
      otp,
      data,
    };
  } catch (error) {
    console.error("Caught Error:", error); // Log the error for debugging
    return {
      success: false,
      error: error.message,
    };
  }
};

// // Example usage
// (async () => {
//   const phoneNumber = "+919817503069"; // Replace with the actual phone number
//   const result = await sendOtp(phoneNumber);
//   console.log(result);
// })();

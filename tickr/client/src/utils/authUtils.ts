// import axios, { AxiosResponse } from "axios";

// // Define the shape of the data being passed to the function
// interface RegisterData {
//   email: string;
//   password: string; // Ensure the property name matches the input
// }

// const userRegister = async ({
//   data,
// }: {
//   data: RegisterData;
// }): Promise<AxiosResponse> => {
//   const { email, password } = data;

//   // Log the email and password for debugging purposes
//   console.log({ email, password });

//   try {
//     // Make the POST request to register the user
//     const response: AxiosResponse = await axios.post(
//       "http://tickr.dev/api/auth/register",
//       {
//         email,
//         password, // Use the correct property name here
//       },
//       {}
//     );

//     // Log the response for debugging
//     console.log({ response });
//     return response; // Return the response to the caller
//   } catch (error) {
//     // Log the error for debugging
//     console.error("Registration error:", error);

//     // Optionally, handle specific error cases here
//     throw error; // Rethrow the error if you want the caller to handle it
//   }
// };

// export { userRegister };

import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

// Define the shape of the data being passed to the function
interface RegisterData {
  email: string;
  username: string;
  password: string; // Ensure the property name matches the input
}

const userRegister = async ({
  data,
}: {
  data: RegisterData;
}): Promise<AxiosResponse> => {
  const { email, password, username } = data;

  // Log the email for debugging purposes (avoid logging sensitive info like password)
  console.log({ email });

  //   Define the Axios request configuration
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json", // Set the content type for the request
      // Add any additional headers here, for example:
      // Authorization: `Bearer ${token}`, // If you need to send an auth token
    },
    // timeout: 5000, // Set a timeout for the request (in milliseconds)
    // Additional options can be included as needed, such as responseType, maxRedirects, etc.
  };

  try {
    // Make the POST request to register the user
    const response: AxiosResponse = await axios.post(
      "https://api.tickr.dev/api/auth/register",
      //   {},
      {
        username,
        email,
        password, // Use the correct property name here
      },
      config // Pass the configuration object here
    );

    // Log the response for debugging
    console.log({ response });
    return response; // Return the response to the caller
  } catch (error) {
    // Log the error for debugging
    console.error("Registration error:", error);

    // Optional: Enhance error handling to provide more context
    if (axios.isAxiosError(error)) {
      // Handle specific Axios errors (if needed)
      console.error("Axios error message:", error.message);
      throw new Error(`Registration failed: ${error.message}`);
    } else {
      // Handle non-Axios errors
      throw new Error("An unexpected error occurred during registration.");
    }
  }
};

export { userRegister };

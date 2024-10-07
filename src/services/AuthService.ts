import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "@/firebase";
import axios from "axios";

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    // Step 1: Register the user with Firebase
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Successfully registered:", result);

    // Step 2: Update the user's display name in Firebase
    await updateProfile(result.user, { displayName });
    console.log("Display name set:", result.user.displayName);

    // Step 3: Prepare user data for the external REST API
    const requestBody = {
      nombre: displayName,
      email: email,
      contrasena: password,
    };

    // Step 4: Send user data to the external REST API
    const apiResponse = await axios.post(
      `${import.meta.env.VITE_API_URL}/usuarios/register`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check for a successful response
    if (apiResponse.status !== 200) {
      throw new Error("Error durante el registro");
    }

    // Step 5: Capture the response
    const responseData = apiResponse.data.id_usuario; // Access the response data directly
    console.log("API Response:", responseData);

    // Optionally return the API response data or the Firebase user
    return { firebaseUser: result.user, id_usuario: responseData };
  } catch (error) {
    // Handle different error types based on the error response
    if (axios.isAxiosError(error)) {
      console.error("Error al registrar el usuario: ", error.response?.data);
      throw new Error("Error al registrar el usuario");
    } else {
      console.error("Error inesperado al registrar el usuario: ", error);
      throw new Error("Error inesperado al registrar el usuario");
    }
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    // Step 1: Attempt to sign in with Firebase
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("Successfully logged in:---->>>>>", result);
    console.log("url: ", `${import.meta.env.VITE_API_URL}/usuarios/login`);

    // Step 2: Prepare the request for the REST API
    const requestBody = {
      email: email,
      contrasena: password,
    };

    // Step 3: Send request to REST API for authentication
    const apiResponse = await axios.post(
      `${import.meta.env.VITE_API_URL}/usuarios/login`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response:", apiResponse);

    // Step 4: Check if the API response is successful
    if (apiResponse.status === 200) {
      const token = apiResponse.data.token; // Capture the token from the API response
      console.log("API Token:", token);
      // You can store the token in local storage or state if necessary
      localStorage.setItem("authToken", token); // Example: Storing the token
      return result.user; // Return the Firebase user object
    } else {
      throw new Error("Error durante el inicio de sesión");
    }
  } catch (error) {
    // Handle different error types based on the error response
    if (axios.isAxiosError(error)) {
      console.error("Error al iniciar sesión: ", error.response?.data);
      throw new Error("Error al iniciar sesión");
    } else {
      console.error("Error inesperado al iniciar sesión: ", error);
      throw new Error("Error inesperado al iniciar sesión");
    }
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error durante el inicio de sesión con Google:", error);
    throw error;
  }
};

export const loginWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error) {
    console.error("Error durante el inicio de sesión con Facebook:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Has cerrado sesión correctamente");
  } catch (error) {
    console.error("Error durante el cierre de sesión:", error);
    throw error;
  }
};

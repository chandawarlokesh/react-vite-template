import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../constants/apiConstants";
import { useState } from "react";

interface usePostOptions {
  onSuccess: (response: AxiosResponse) => void;
  onError: (response: AxiosResponse) => void;
}

const usePost = <T,>(path: string, { onSuccess, onError }: usePostOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);

  const mutate = async (payload: T) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}${path}`, payload);
      setIsLoading(false);
      if (response.status === 200 || response.status === 201) {
        onSuccess(response);
      } else {
        onError(response);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsError(false);
  };

  return { mutate, reset, isLoading, isError };
};

export default usePost;

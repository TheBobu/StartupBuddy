import { useState, useEffect } from "react";
import api from "./api";

const useHttp = ({ url, method, body = null, headers = null, autoRun = true }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  const fetchData = async (body) => {
    api[method](url, body)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err.response);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    if (!autoRun) {
      return;
    }
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading, setloading, fetchData };
};

export default useHttp;

import { useState } from 'react';

export const useHttp = () => {
  const [process, setProcess] = useState('waiting');

  const request = async (
    url: string,
    method: string = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json' },
  ) => {
    setProcess('loading');

    try {
      const response = await fetch(url, { method, headers, body });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();
      setProcess('fulfield');
      return data;
    } catch (e) {
      setProcess('error');
      throw e;
    }
  };

  return { request, process };
};

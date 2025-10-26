import { useEffect, useState } from 'react';

interface URLParams {
  search: string;
  category: string;
}

export function useURLParams() {
  const [params, setParams] = useState<URLParams>({
    search: '',
    category: ''
  });

  // Leer parámetros de la URL al montar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setParams({
      search: urlParams.get('search') || '',
      category: urlParams.get('category') || ''
    });
  }, []);

  // Actualizar URL cuando cambian los parámetros
  const updateURLParams = (newParams: Partial<URLParams>) => {
    const updatedParams = { ...params, ...newParams };
    setParams(updatedParams);

    const urlParams = new URLSearchParams();
    
    if (updatedParams.search) {
      urlParams.set('search', updatedParams.search);
    }
    
    if (updatedParams.category) {
      urlParams.set('category', updatedParams.category);
    }

    const newURL = urlParams.toString() 
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;

    window.history.pushState({}, '', newURL);
  };

  return { params, updateURLParams };
}


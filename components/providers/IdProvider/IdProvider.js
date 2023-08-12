'use client'
import { useSession } from 'next-auth/react';
import React from 'react';


export const IdContext = React.createContext()

function IdProvider({ children }) {
  const { data: session, status } = useSession()
  const [id, setId] = React.useState('')

  React.useEffect(() => {
    const getUserId = async () => {
      if (status !== 'authenticated') {
        return;
      }
      try {
        const response = await fetch('/api/admin/env');
        const url = await response.json();
        const userDataResponse = await fetch(`${url}/api/user/user?email=${session.user.email}`);
        const fetchedID = await userDataResponse.json();
        setId(fetchedID);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const storedID = window.localStorage.getItem('user-id')
    if (!storedID) {
      getUserId();
      window.localStorage.setItem('user-id', id);
    } else {
      setId(storedID)
    }
  }, [id, status, session]);

  return (
    <IdContext.Provider value={{ id }}>
      {children}
    </IdContext.Provider>
  );
}

export default IdProvider;

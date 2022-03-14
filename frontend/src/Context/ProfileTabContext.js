import React, { useContext, useRef, useState } from 'react'
import { createContext } from 'react'

const ProfileTabContext = createContext();
export const useProfileTab = () => useContext(ProfileTabContext);

export default function ProfileTabProvider(props) {
  const [activeTab, setActiveTab] = useState(1);
  
  return (
    <ProfileTabContext.Provider value={{ activeTab, setActiveTab }}>
      {props.children}
    </ProfileTabContext.Provider>
  )
}

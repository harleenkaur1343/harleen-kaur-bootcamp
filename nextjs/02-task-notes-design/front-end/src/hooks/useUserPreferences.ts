'use client'

import { useState, useEffect } from 'react';

interface UserPrefernces {
    theme: 'light' | 'dark';
    compactMode: boolean;
    showCompletedTasks : boolean;
    taskSortOrder : 'date' | 'priority' | 'title'
}

const defaultPreferences : UserPrefernces = {
  theme: 'light',
  compactMode: false,
  showCompletedTasks : true,
  taskSortOrder: 'date'
}

export function useUserPreferences(){
  const [preferences, setUserPreferences] = useState<UserPrefernces>(defaultPreferences);

  useEffect(()=>{
    const saved = localStorage.getItem('userPreferences');

    if(saved){
      try{
        setUserPreferences({...defaultPreferences, ...JSON.parse(saved)})
      }catch(error){
        console.log('Failed to parse user preferences:', error);
      }
    }
  }, []);

  const updatePreferences = <K extends keyof UserPrefernces>(key:K, value:UserPrefernces[K]) => {
    const newPreferences = {...preferences, [key]:value};
    setUserPreferences(newPreferences);
    localStorage.setItem('userPreferences',JSON.stringify(newPreferences));
  };

  return{
      preferences,
      updatePreferences
  }
}


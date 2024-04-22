


import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [m, setM] = useState("");    
    const [sm, setSm] = useState("");    
    const [g, setG] = useState("");    
    const [sk, setSk] = useState("");    
    const [level, setLevel] = useState(0);  
    const [levelCode, setLevelCode] = useState(1);  

    
    const updateM = (m) => {        
        setM(m);
    }
    const updateSM = (sm) => {        
        setSm(sm);
    }
    const updateG = (g) => {        
        setG(g);
    }
    const updateSK = (sk) => {        
        setSk(sk);
    }
    const updateLevel = (level) => {        
        setLevel(level);
    }
    const updateLevelCode = (levelCode) => {        
        setLevelCode(levelCode);
    }
  
  const initialData = {
    m: m,
    sm: sm,
    g: g,
    sk: sk,
    level:level,
    levelCode:levelCode,
    updateM: updateM,
    updateSM: updateSM,
    updateG: updateG,
    updateSK: updateSK,
    updateLevel:updateLevel,
    updateLevelCode: updateLevelCode
  }

  return (
    <DataContext.Provider value={initialData}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;


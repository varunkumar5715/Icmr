
import React, { createContext, useState } from 'react';
import df from '../utils/Dataflow.json';
import levelsData from '../utils/Level.json';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [m, setM] = useState("");
  const [sm, setSm] = useState("");
  const [g, setG] = useState("");
  const [sk, setSk] = useState("");
  const [level, setLevel] = useState(0);
  const [levelCode, setLevelCode] = useState(1);
  const [data, setData] = useState(df.dataFlow);
  const [levels, setLevels] = useState(levelsData.levels);
  const [skillCode, setSkillCode] = useState();
  const [instruction, setInstruction] = useState(null);
  const [testdata, setTestdata] = useState([]);
  const [folderPath, setFolderPath] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});

  const updateM = (m) => { setM(m); };
  const updateSM = (sm) => { setSm(sm); };
  const updateG = (g) => { setG(g); };
  const updateSK = (sk) => { setSk(sk); };
  const updateLevel = (level) => { setLevel(level); };
  const updateLevelCode = (levelCode) => { setLevelCode(levelCode); };
  const updateSkillCode = (skillCode) => { setSkillCode(skillCode); };
  const updateInstruction = (instruction) => { setInstruction(instruction); };
  const updatedata = (data) => { setData(data); };
  const updateTestdata = (testdata) => {    
    setTestdata(testdata);
  };
  const updateFolderPath = (folderPath) => { setFolderPath(folderPath); };

  const updateSelectedOptions = (options) => {
    setSelectedOptions(options);
    console.log('Selected options updated:', options);
  };

  const initialData = {
    m, sm, g, sk, level, levelCode, data, levels, skillCode, instruction, testdata, folderPath,selectedOptions,
    updateM, updateSM, updateG, updateSK, updateLevel, updateLevelCode, updatedata, updateSkillCode,
    updateTestdata, updateFolderPath, updateInstruction, updateSelectedOptions
  };

  return (
    <DataContext.Provider value={initialData}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

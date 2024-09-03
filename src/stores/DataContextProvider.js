import React, { createContext, useState } from 'react';
import df from '../utils/Dataflow.json';
import levelsData from '../utils/Level.json';

// Create context
const DataContext = createContext();

// Provider component
export const DataContextProvider = ({ children }) => {
  // State variables
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
  const [testCode, setTestCode] = useState(1);
  const [isi, setIsi] = useState(""); // Default ISI (Inter-Stimulus Interval)
  const [ibi, setIbi] = useState(""); // Default IBI (Inter-Block Interval)

  // Update functions
  const updateM = (value) => setM(value);
  const updateSM = (value) => setSm(value);
  const updateG = (value) => setG(value);
  const updateSK = (value) => setSk(value);
  const updateLevel = (value) => setLevel(value);
  const updateLevelCode = (value) => setLevelCode(value);
  const updateSkillCode = (value) => setSkillCode(value);
  const updateInstruction = (value) => setInstruction(value);
  const updatedata = (value) => setData(value);
  const updateTestdata = (value) => setTestdata(value);
  const updateFolderPath = (value) => setFolderPath(value);
  const updateSelectedOptions = (options) => {
    setSelectedOptions(options);
    console.log('Selected options updated:', options);
  };
  const updateTestCode = (value) => setTestCode(value);
  const updateIsi = (value) => {
    setIsi(value);
    console.log('ISI updated:', value);
  };
  const updateIbi = (value) => {
    setIbi(value);
    console.log('IBI updated:', value);
  };

  // Initial data for context
  const initialData = {
    m, sm, g, sk, level, levelCode, data, levels, skillCode, instruction, testdata, folderPath, selectedOptions, testCode, isi, ibi,
    updateM, updateSM, updateG, updateSK, updateLevel, updateLevelCode, updatedata, updateSkillCode,
    updateTestdata, updateFolderPath, updateInstruction, updateSelectedOptions, updateTestCode, updateIsi, updateIbi
  };

  return (
    <DataContext.Provider value={initialData}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

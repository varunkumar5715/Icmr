

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
  
  // New state for played scripts
  const [playedScripts, setPlayedScripts] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [testCode, setTestCode] = useState(1);
  const [isi, setIsi] = useState(""); // Default ISI (Inter-Stimulus Interval)
  const [ibi, setIbi] = useState(""); // Default IBI (Inter-Block Interval)
  const [memoryScoreCount, setMemoryScoreCount] = useState(0); // Memory score state
const [sequenceScoreCount, setSequenceScoreCount] = useState(0); // Sequence score state
const [ totalSetsPlayed,setTotalSetsPlayed] = useState(0);

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
  const updateMemoryScoreCount = (value) => setMemoryScoreCount(value);
const updateSequenceScoreCount = (value) => setSequenceScoreCount(value);
const updateTotalSetsPlayed = (value) => setTotalSetsPlayed(value);
  const updateSelectedOptions = (options) => {
    setSelectedOptions(options);
  };
  const updateTestCode = (value) => {
    setTestCode(value);
  };
  const updateIsi = (value) => {
    setIsi(value);
  };
  const updateIbi = (value) => {
    setIbi(value);
  };

  // New function to update played scripts
  const updatePlayedScripts = (scripts) => {
    setPlayedScripts(scripts);
  };



  // Initial data for context
  const initialData = {
    m, sm, g, sk, level, levelCode, data,memoryScoreCount,totalSetsPlayed,sequenceScoreCount, levels, skillCode, instruction, testdata, folderPath, selectedOptions, testCode, isi, ibi,
    playedScripts, updatePlayedScripts,  // Include playedScripts and its update function
    updateM, updateSM, updateG, updateSK, updateLevel,updateMemoryScoreCount,updateSequenceScoreCount, updateLevelCode, updatedata, updateSkillCode,
    updateTestdata, updateFolderPath,updateTotalSetsPlayed, updateInstruction, updateSelectedOptions, updateTestCode, updateIsi, updateIbi
  };

  return (
    <DataContext.Provider value={initialData}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

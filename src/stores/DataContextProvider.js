
// import React, { createContext, useState, useContext } from 'react';
// import df from '../utils/Dataflow.json';
// import levelsData from '../utils/Level.json';

// const DataContext = createContext();

// export const DataContextProvider = ({ children }) => {
//     const [m, setM] = useState("");
//     const [sm, setSm] = useState("");
//     const [g, setG] = useState("");
//     const [sk, setSk] = useState("");
//     const [level, setLevel] = useState(0);
//     const [levelCode, setLevelCode] = useState(1);
//     const [data, setData] = useState(df.dataFlow);
//     const [levels, setLevels] = useState(levelsData.levels);
//     const [skillCode, setSkillCode] = useState();

//     const updateM = (m) => { setM(m); };
//     const updateSM = (sm) => { setSm(sm); };
//     const updateG = (g) => { setG(g); };
//     const updateSK = (sk) => { setSk(sk); };
//     const updateLevel = (level) => { setLevel(level); };
//     const updateLevelCode = (levelCode) => { setLevelCode(levelCode); };
//     const updateSkillCode = (skillCode) => { setSkillCode(skillCode); };
//     const updatedata = (data) => { setData(data); };

//     const initialData = {
//         m, sm, g, sk, level, levelCode, data, levels, skillCode,
//         updateM, updateSM, updateG, updateSK, updateLevel, updateLevelCode, updatedata, updateSkillCode
//     };

//     return (
//         <DataContext.Provider value={initialData}>
//             {children}
//         </DataContext.Provider>
//     );
// };

// export const useDataContext = () => useContext(DataContext);

// export default DataContext;



import React, { createContext, useState, useContext } from 'react';
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
    const [testdata, setTestdata] = useState({
        standard: [],
        variable: [],
        isi: [],
        ibi: []
    });

    const updateM = (m) => { setM(m); };
    const updateSM = (sm) => { setSm(sm); };
    const updateG = (g) => { setG(g); };
    const updateSK = (sk) => { setSk(sk); };
    const updateLevel = (level) => { setLevel(level); };
    const updateLevelCode = (levelCode) => { setLevelCode(levelCode); };
    const updateSkillCode = (skillCode) => { setSkillCode(skillCode); };
    const updatedata = (data) => { setData(data); };
    const updateTestdata = (testdata) => { 
        const { standard, variable, isi, ibi } = testdata;
        setTestdata({ standard, variable, isi, ibi }); 
    };

    const initialData = {
        m, sm, g, sk, level, levelCode, data, levels, skillCode, testdata,
        updateM, updateSM, updateG, updateSK, updateLevel, updateLevelCode, updatedata, updateSkillCode,
        updateTestdata,
    };

    return (
        <DataContext.Provider value={initialData}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);

export default DataContext;

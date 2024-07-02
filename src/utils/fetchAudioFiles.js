// src/utils/fetchAudioFiles.js

const fetchAudioFiles = async (folderPath, filename) => {
  try {
    //club the folderpath and filename to a variable
    const response = await fetch(`/api/audiofiles/${folderPath}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const files = await response.json();
    return files.audioFiles; // Assuming the API returns { audioFiles: [...] }
  } catch (error) {
    console.error('Error fetching audio files:', error.message);
    return [];
  }
};

export default fetchAudioFiles;

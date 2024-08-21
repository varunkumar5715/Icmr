import backendIP from './serverData';

export async function getAudio(filenameWithPath, callback) {
    try {
        const response = await fetch(`${backendIP}/audio/getaudio`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filenameWithPath })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const file = await response.blob();
        const data = URL.createObjectURL(file);
        callback(data);  // Pass the audio URL to the callback

    } catch (error) {
        console.error('Error fetching audio files:', error);
        callback('');  // Pass an empty string to indicate failure
    }
}

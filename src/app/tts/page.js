'use client'
import { useState } from 'react';

export default function TTSPage() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the process starts

    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setAudioUrl(data.audioUrl);
    setLoading(false); // Set loading to false when the process is done
  };

  return (
    <div>
      <h1>Generate Speech with CloudLabs</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Speech'}
        </button>
      </form>   

      {loading && <p>Loading... Please wait.</p>} {/* Display loading message */}

      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

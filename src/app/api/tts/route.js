import axios from 'axios';
import FormData from 'form-data';

export async function POST(req) {
  const { text } = await req.json();

  const data = new FormData();
  data.append('voice_code', 'en-US-1');
  data.append('text', text);
  data.append('speed', '1.00');
  data.append('pitch', '1.00');
  data.append('output_type', 'audio_url');

  const options = {
    method: 'POST',
    url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize',
    headers: {
      'x-rapidapi-key': "9a02a58761mshe10558b44c3bbb1p141ed7jsnba319c901506", // Store the API key in .env.local
      'x-rapidapi-host': 'cloudlabs-text-to-speech.p.rapidapi.com',
      ...data.getHeaders(),
    },
    data: data
  };

  try {
    const response = await axios.request(options);
    const audioUrl = response.data.result.audio_url;

    return new Response(JSON.stringify({ audioUrl }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to generate TTS audio' }), { status: 500 });
  }
}

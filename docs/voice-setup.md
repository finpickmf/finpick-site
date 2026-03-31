# Part 2: ElevenLabs Voice Setup

## Overview

ElevenLabs provides the most natural-sounding Hindi and Marathi voices for the Indian market. This guide covers voice selection, cloning, and API integration.

## Voice Selection

### Recommended Voices for "Priya" Character

| Voice ID | Name | Gender | Accent | Best For |
|----------|------|--------|--------|----------|
| `EXAVITQu4vr4xnSDxMaL` | Sarah | Female | Neutral Indian | Primary choice |
| `MF3mGyEYCl7XYWbV9V6O` | Elli | Female | Soft Indian | Alternative |
| `TxGEqnHWrfWFTfGW9XjX` | Josh | Male | Neutral | Male agent option |

### Custom Voice Cloning Steps

1. **Record Sample Audio**
   - Duration: 5-10 minutes of clean audio
   - Format: WAV or MP3, 44.1kHz sample rate
   - Content: Natural conversation in Hindi/Marathi
   - Environment: Quiet room, no background noise

2. **Upload to ElevenLabs**
   ```bash
   curl -X POST "https://api.elevenlabs.io/v1/voices/add" \
     -H "xi-api-key: YOUR_API_KEY" \
     -F "name=Priya_Custom" \
     -F "description=Friendly Indian female voice for sales" \
     -F "files=@sample1.wav" \
     -F "files=@sample2.wav" \
     -F "files=@sample3.wav"
   ```

3. **Wait for Processing** (typically 5-10 minutes)

4. **Test the Voice**
   ```bash
   curl -X POST "https://api.elevenlabs.io/v1/text-to-svoice/PRIYA_VOICE_ID" \
     -H "xi-api-key: YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "text": "नमस्ते! मैं प्रिया हूँ। मैं आपकी कैसे मदद कर सकती हूँ?",
       "model_id": "eleven_multilingual_v2",
       "voice_settings": {
         "stability": 0.65,
         "similarity_boost": 0.80,
         "style": 0.50,
         "use_speaker_boost": true
       }
     }' \
     --output output.mp3
   ```

## Exact Tuning Parameters

### Optimal Settings for Hindi/Marathi

```json
{
  "stability": 0.65,
  "similarity_boost": 0.80,
  "style": 0.50,
  "use_speaker_boost": true
}
```

### Parameter Explanations

| Parameter | Value | Effect |
|-----------|-------|--------|
| `stability` | 0.65 | Balances consistency vs. expressiveness. Lower = more emotional, Higher = more stable |
| `similarity_boost` | 0.80 | How close to cloned voice. Higher = more accurate clone |
| `style` | 0.50 | Controls exaggeration of speech patterns |
| `use_speaker_boost` | true | Enhances voice clarity and presence |

### Language-Specific Adjustments

**For Hindi:**
```json
{
  "stability": 0.65,
  "similarity_boost": 0.80,
  "style": 0.55
}
```

**For Marathi:**
```json
{
  "stability": 0.60,
  "similarity_boost": 0.85,
  "style": 0.50
}
```

**For English (Indian accent):**
```json
{
  "stability": 0.70,
  "similarity_boost": 0.75,
  "style": 0.45
}
```

## Live API Integration

### Streaming TTS Endpoint

```python
import requests
import json

ELEVENLABS_API_KEY = "your_api_key_here"
VOICE_ID = "PRIYA_VOICE_ID"  # Your custom voice ID

def generate_speech_streaming(text, language="hi"):
    """
    Generate streaming audio for Hindi/Marathi text
    """
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/stream"
    
    headers = {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
    }
    
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.65,
            "similarity_boost": 0.80,
            "style": 0.50,
            "use_speaker_boost": True
        },
        "pronunciation_dictionary_locators": []
    }
    
    response = requests.post(url, headers=headers, json=payload, stream=True)
    
    if response.status_code == 200:
        return response.iter_content(chunk_size=1024)
    else:
        raise Exception(f"API Error: {response.status_code} - {response.text}")

# Usage example
text_hindi = "नमस्ते राजेश जी! मैं फिनपिक से प्रिया बोल रही हूँ। क्या यह बात करने का सही समय है?"

for chunk in generate_speech_streaming(text_hindi):
    # Send chunk to audio output
    play_audio_chunk(chunk)
```

### Complete cURL Command for Testing

```bash
#!/bin/bash

# Set your API key
API_KEY="your_elevenlabs_api_key"
VOICE_ID="your_voice_id"

# Hindi text
TEXT="नमस्ते! मैं फिनपिक से प्रिया बोल रही हूँ। 
क्या आपने व्यक्तिगत ऋण के लिए आवेदन किया था?
हमारे पास आपके लिए एक शानदार ऑफर है।"

# Make API call
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}" \
  -H "xi-api-key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"text\": \"${TEXT}\",
    \"model_id\": \"eleven_multilingual_v2\",
    \"voice_settings\": {
      \"stability\": 0.65,
      \"similarity_boost\": 0.80,
      \"style\": 0.50,
      \"use_speaker_boost\": true
    },
    \"generation_config\": {
      \"chunk_length_schedule\": [120, 160, 200, 240, 280]
    }
  }" \
  --output priya_output.mp3

echo "Audio generated successfully!"
```

### Marathi Example

```bash
TEXT_MR="नमस्कार! मी फिनपिकची प्रिया बोलतेय.
काय हा बोलण्याचा योग्य वेळ आहे?
तुम्ही वैयक्तिक कर्जासाठी अर्ज केला होता ना?"

curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}" \
  -H "xi-api-key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"text\": \"${TEXT_MR}\",
    \"model_id\": \"eleven_multilingual_v2\",
    \"voice_settings\": {
      \"stability\": 0.60,
      \"similarity_boost\": 0.85,
      \"style\": 0.50,
      \"use_speaker_boost\": true
    }
  }" \
  --output priya_marathi.mp3
```

## Integration with Retell AI

### Voice Provider Configuration

```json
{
  "voice_provider": "elevenlabs",
  "voice_id": "PRIYA_VOICE_ID",
  "api_key": "${ELEVENLABS_API_KEY}",
  "model": "eleven_multilingual_v2",
  "voice_settings": {
    "stability": 0.65,
    "similarity_boost": 0.80,
    "style": 0.50,
    "use_speaker_boost": true
  },
  "language_detection": "auto",
  "supported_languages": ["hi", "mr", "en"]
}
```

### Real-time Streaming Setup

```python
class ElevenLabsStreamingClient:
    def __init__(self, api_key, voice_id):
        self.api_key = api_key
        self.voice_id = voice_id
        self.base_url = "https://api.elevenlabs.io/v1/text-to-speech"
        
    async def stream_audio(self, text, websocket):
        """Stream audio directly to websocket for real-time playback"""
        url = f"{self.base_url}/{self.voice_id}/stream"
        
        payload = {
            "text": text,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "stability": 0.65,
                "similarity_boost": 0.80,
                "style": 0.50,
                "use_speaker_boost": True
            }
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers={
                "xi-api-key": self.api_key,
                "Content-Type": "application/json"
            }, json=payload) as response:
                async for chunk in response.content.iter_chunked(1024):
                    await websocket.send_bytes(chunk)
```

## Quality Assurance Checklist

### Before Production Deployment

- [ ] Voice sounds natural in Hindi
- [ ] Voice sounds natural in Marathi
- [ ] No robotic artifacts in speech
- [ ] Proper pronunciation of financial terms
- [ ] Consistent voice quality across different texts
- [ ] Latency under 500ms for streaming
- [ ] Fallback voice configured
- [ ] Rate limits understood and handled

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Robotic sound | Increase stability to 0.70-0.75 |
| Too monotone | Increase style to 0.60-0.65 |
| Mispronunciation | Add pronunciation dictionary entries |
| High latency | Use streaming endpoint, reduce chunk size |
| Voice breaks up | Decrease similarity_boost to 0.70-0.75 |

## Cost Optimization

### Pricing Tiers (as of 2024)

| Plan | Characters/Month | Price (USD) | Price (₹) |
|------|------------------|-------------|-----------|
| Free | 10,000 | $0 | ₹0 |
| Starter | 30,000 | $5 | ~₹415 |
| Creator | 100,000 | $22 | ~₹1,830 |
| Pro | 500,000 | $99 | ~₹8,240 |

### Optimization Tips

1. **Cache common responses**: Store frequently used audio clips
2. **Use shorter prompts**: Optimize scripts for brevity
3. **Batch generation**: Pre-generate static responses
4. **Monitor usage**: Set up alerts at 80% quota

---

*Next: Part 3 - Retell AI Configuration*

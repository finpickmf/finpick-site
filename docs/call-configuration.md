# Part 3: Retell AI Configuration

## Overview

Retell AI provides the call infrastructure for outbound and inbound calls with integrated speech-to-text, LLM processing, and text-to-speech capabilities.

## Account Setup

### Step 1: Create Retell AI Account

1. Visit [https://retell.ai](https://retell.ai)
2. Sign up with email or Google account
3. Complete business verification (required for India numbers)
4. Get your API key from dashboard

### Step 2: Configure Agent

```bash
curl -X POST "https://api.retell.ai/v1/create-agent" \
  -H "Authorization: Bearer YOUR_RETELL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_name": "FinPick_Priya",
    "llm_websocket_url": "wss://your-server.com/llm-websocket",
    "voice_id": "ELEVENLABS_VOICE_ID",
    "voice_provider": "elevenlabs",
    "language": "hi",
    "first_message": "नमस्ते! क्या यह बात करने का सही समय है?",
    "completion_prompt": "See Part 4 for full prompt",
    "background_sound": "none",
    "call_termination_phrase": ["धन्यवाद", "अलविदा", "शुक्रिया"],
    "auto_record_call": true
  }'
```

## India Phone Number Configuration via Twilio

### Option A: Bring Your Own Number (Recommended)

1. **Purchase Twilio India Number**
   ```bash
   curl -X POST "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/IncomingPhoneNumbers.json" \
     --user "YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN" \
     -d "PhoneNumber=+91XXXXXXXXXX" \
     -d "VoiceUrl=https://api.retell.ai/v1/twilio-webhook"
   ```

2. **Connect to Retell AI**
   ```bash
   curl -X POST "https://api.retell.ai/v1/register-number" \
     -H "Authorization: Bearer YOUR_RETELL_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "phone_number": "+91XXXXXXXXXX",
       "provider": "twilio",
       "agent_id": "AGENT_ID_FROM_STEP_2",
       "country_code": "IN"
     }'
   ```

### Option B: Retell Provided Number

```bash
curl -X POST "https://api.retell.ai/v1/buy-number" \
  -H "Authorization: Bearer YOUR_RETELL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "IN",
    "region": "Mumbai",
    "agent_id": "AGENT_ID_FROM_STEP_2"
  }'
```

## Outbound Call API

### Basic Call Initiation

```bash
curl -X POST "https://api.retell.ai/v1/make-call" \
  -H "Authorization: Bearer YOUR_RETELL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "AGENT_ID",
    "to_number": "+919876543210",
    "from_number": "+91XXXXXXXXXX",
    "record_call": true,
    "metadata": {
      "lead_id": "LEAD_12345",
      "campaign": "personal_loan_jan2024"
    }
  }'
```

### Call with Dynamic Variables

```bash
curl -X POST "https://api.retell.ai/v1/make-call" \
  -H "Authorization: Bearer YOUR_RETELL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "AGENT_ID",
    "to_number": "+919876543210",
    "from_number": "+91XXXXXXXXXX",
    "record_call": true,
    "custom_llm_variables": {
      "lead_name": "Rajesh Kumar",
      "product_interest": "Personal Loan",
      "loan_amount": "₹5,00,000",
      "city": "Mumbai",
      "language": "hindi",
      "source": "Instagram Ad",
      "previous_interaction": "false"
    },
    "metadata": {
      "lead_id": "LEAD_12345",
      "campaign": "personal_loan_jan2024",
      "priority": "high"
    }
  }'
```

### Batch Call Initiation

```python
import requests
import time

RETELL_API_KEY = "your_api_key"
AGENT_ID = "your_agent_id"
FROM_NUMBER = "+91XXXXXXXXXX"

leads = [
    {
        "phone": "+919876543210",
        "name": "Rajesh Kumar",
        "product": "Personal Loan",
        "amount": "500000",
        "city": "Mumbai",
        "language": "hindi"
    },
    {
        "phone": "+919876543211",
        "name": "Priya Sharma",
        "product": "Home Loan",
        "amount": "2500000",
        "city": "Pune",
        "language": "marathi"
    }
]

def initiate_calls(leads, max_concurrent=5):
    """Initiate calls with rate limiting"""
    headers = {
        "Authorization": f"Bearer {RETELL_API_KEY}",
        "Content-Type": "application/json"
    }
    
    active_calls = 0
    results = []
    
    for lead in leads:
        while active_calls >= max_concurrent:
            time.sleep(2)
            active_calls -= 1
        
        payload = {
            "agent_id": AGENT_ID,
            "to_number": lead["phone"],
            "from_number": FROM_NUMBER,
            "record_call": True,
            "custom_llm_variables": {
                "lead_name": lead["name"],
                "product_interest": lead["product"],
                "loan_amount": f"₹{int(lead[\"amount\"]):,}",
                "city": lead["city"],
                "language": lead["language"]
            },
            "metadata": {
                "lead_id": f"LEAD_{int(time.time())}",
                "campaign": "batch_outreach_jan2024"
            }
        }
        
        response = requests.post(
            "https://api.retell.ai/v1/make-call",
            headers=headers,
            json=payload
        )
        
        if response.status_code == 200:
            results.append({"status": "success", "data": response.json()})
            active_calls += 1
        else:
            results.append({"status": "failed", "error": response.text})
    
    return results

# Usage
results = initiate_calls(leads, max_concurrent=3)
```

## Webhook Configuration

### Call Status Webhooks

Configure webhook endpoint to receive real-time call updates:

```bash
curl -X POST "https://api.retell.ai/v1/update-agent" \
  -H "Authorization: Bearer YOUR_RETELL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "AGENT_ID",
    "webhook_url": "https://your-server.com/webhooks/retell",
    "webhook_events": [
      "call_started",
      "call_ended",
      "call_failed",
      "recording_available"
    ]
  }'
```

### Webhook Payload Examples

**Call Started:**
```json
{
  "event": "call_started",
  "call_id": "call_abc123",
  "agent_id": "AGENT_ID",
  "to_number": "+919876543210",
  "from_number": "+91XXXXXXXXXX",
  "timestamp": "2024-01-15T10:30:00Z",
  "metadata": {
    "lead_id": "LEAD_12345"
  }
}
```

**Call Ended:**
```json
{
  "event": "call_ended",
  "call_id": "call_abc123",
  "agent_id": "AGENT_ID",
  "duration_seconds": 145,
  "call_status": "completed",
  "transcript_url": "https://api.retell.ai/v1/transcripts/call_abc123",
  "recording_url": "https://api.retell.ai/v1/recordings/call_abc123",
  "summary": "Customer interested in personal loan, requested callback tomorrow",
  "sentiment": "positive",
  "timestamp": "2024-01-15T10:32:25Z"
}
```

**Call Failed:**
```json
{
  "event": "call_failed",
  "call_id": "call_abc123",
  "agent_id": "AGENT_ID",
  "failure_reason": "no_answer",
  "attempts": 1,
  "timestamp": "2024-01-15T10:30:30Z"
}
```

## Advanced Configuration

### Language Switching

Configure dynamic language switching based on customer preference:

```json
{
  "agent_id": "AGENT_ID",
  "language_detection": "auto",
  "supported_languages": ["hi", "mr", "en"],
  "default_language": "hi",
  "language_switch_phrases": {
    "hindi_to_marathi": ["मराठीत बोलायला आवडेल का?"],
    "marathi_to_hindi": ["हिंदी में बात करें?"],
    "any_to_english": ["Would you prefer English?"]
  }
}
```

### Call Termination Rules

```json
{
  "max_duration_seconds": 600,
  "silence_timeout_seconds": 30,
  "termination_phrases": ["धन्यवाद", "बाय", "ठीक है"],
  "escalation_trigger": ["manager", "supervisor", "complaint"],
  "auto_transfer_number": "+91XXXXXXXXXX"
}
```

### Response Time Optimization

```json
{
  "latency_optimization": {
    "pre_connect_tts": true,
    "streaming_enabled": true,
    "vad_sensitivity": 0.7,
    "interruption_enabled": true,
    "response_delay_ms": 200
  }
}
```

## Testing Checklist

### Pre-Launch Tests

- [ ] Test call to own number
- [ ] Verify voice quality in Hindi
- [ ] Verify voice quality in Marathi
- [ ] Test language switching
- [ ] Verify webhook delivery
- [ ] Test call recording
- [ ] Test call termination
- [ ] Verify transcript accuracy
- [ ] Test with poor network conditions
- [ ] Test concurrent call handling

### Load Testing

```python
def load_test(num_calls=10):
    """Test system under load"""
    import concurrent.futures
    
    def make_single_call(lead):
        # Implementation from batch call above
        pass
    
    test_leads = generate_test_leads(num_calls)
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(make_single_call, lead) for lead in test_leads]
        results = [f.result() for f in concurrent.futures.as_completed(futures)]
    
    success_rate = sum(1 for r in results if r["status"] == "success") / num_calls
    print(f"Success Rate: {success_rate * 100:.2f}%")
    
    return results
```

## Troubleshooting

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Call not connecting | Invalid number format | Use E.164 format (+91...) |
| Voice not playing | ElevenLabs API issue | Check API key and voice ID |
| High latency | Network issues | Enable streaming, reduce chunk size |
| Webhooks not received | Firewall blocking | Whitelist Retell IPs |
| Poor transcription | Background noise | Adjust VAD sensitivity |
| Call drops immediately | LLM websocket down | Check websocket server |

## Cost Management

### Pricing (as of 2024)

| Component | Rate | Estimated Monthly Cost |
|-----------|------|----------------------|
| Platform Fee | $0.06/min | ₹4,000 (2000 mins) |
| Twilio India Number | ₹500/month + usage | ₹1,000 |
| ElevenLabs | Included or separate | ₹1,830 (Creator plan) |
| **Total** | | **~₹6,830** |

### Cost Optimization Tips

1. Set max call duration (5-7 minutes optimal)
2. Implement efficient conversation flows
3. Use silence detection to end calls early
4. Batch calls during off-peak hours
5. Monitor and optimize connection rates

---

*Next: Part 4 - AI Brain Prompt for Priya*

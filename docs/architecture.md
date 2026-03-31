# Part 1: System Architecture

## 6-Layer Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    FinPick AI Voice Sales System                │
└─────────────────────────────────────────────────────────────────┘

Layer 1: Lead Capture (Instagram/Facebook Ads)
    ↓
Layer 2: Lead Processing & Validation
    ↓
Layer 3: AI Voice Call (Retell AI + ElevenLabs)
    ↓
Layer 4: CRM Integration (Zoho CRM)
    ↓
Layer 5: WhatsApp Follow-up
    ↓
Layer 6: Analytics & Optimization
```

## Layer 1: Lead Capture

### Sources
- Instagram Lead Ads
- Facebook Lead Ads
- Landing Page Forms
- Website Chat Widgets

### Data Captured
```json
{
  "lead_id": "unique_id",
  "name": "Rajesh Kumar",
  "phone": "+91-9876543210",
  "email": "rajesh@example.com",
  "city": "Mumbai",
  "language_preference": "hindi",
  "product_interest": "personal_loan",
  "loan_amount": "500000",
  "source": "instagram_ad_campaign_1",
  "timestamp": "2024-01-15T10:30:00+05:30"
}
```

## Layer 2: Lead Processing

### Validation Rules
1. Phone number format validation (Indian numbers)
2. Duplicate lead detection (last 30 days)
3. Blacklist check (DNC registry)
4. Lead scoring based on completeness

### Processing Flow
```python
def process_lead(lead_data):
    # Validate phone
    if not validate_indian_phone(lead_data['phone']):
        return {'status': 'invalid_phone'}
    
    # Check duplicates
    if is_duplicate(lead_data['phone'], days=30):
        return {'status': 'duplicate'}
    
    # Check DNC
    if is_dnc_registered(lead_data['phone']):
        return {'status': 'dnc_blocked'}
    
    # Score lead
    score = calculate_lead_score(lead_data)
    
    # Queue for calling
    if score >= 50:
        queue_for_call(lead_data, priority='high' if score >= 80 else 'normal')
    
    return {'status': 'queued', 'score': score}
```

## Layer 3: AI Voice Call

### Tool Stack Options

| Component | Primary | Fallback 1 | Fallback 2 |
|-----------|---------|------------|------------|
| Voice AI | Retell AI | Twilio + AI | Knowlarity |
| TTS | ElevenLabs | Murf.ai | Amazon Polly |
| LLM | Claude 3.5 | GPT-4o | Gemini Pro |
| STT | Retell Built-in | Whisper | Google Speech |

### Call Flow
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Initiate    │────▶│  Connect     │────▶│  Conversation│
│  Call        │     │  & Greet     │     │  Flow        │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
         ┌────────────────────────────────────────┘
         ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Handle      │────▶│  Close &     │────▶│  Post-Call   │
│  Objections  │     │  Next Steps  │     │  Actions     │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Layer 4: CRM Integration

### Zoho CRM Modules Used
- Leads
- Contacts
- Calls (Activity)
- Tasks (Follow-ups)

### API Endpoints
```
POST /crm/v2/Leads          - Create new lead
PUT  /crm/v2/Leads/{id}     - Update lead status
POST /crm/v2/Calls          - Log call activity
POST /crm/v2/Tasks          - Create follow-up task
```

### Tag System
| Tag | Description | Trigger |
|-----|-------------|---------|
| HOT | Ready to convert | Expressed immediate interest |
| WARM | Needs nurturing | Showed interest, needs follow-up |
| COLD | Not interested | Explicitly declined |
| CALLBACK | Requested callback | Asked to call later |
| NO_ANSWER | Didn't pick up | Call not answered |
| WRONG_NUMBER | Invalid contact | Number not reachable |
| DNC | Do not call | Requested no further calls |

## Layer 5: WhatsApp Follow-up

### Message Triggers
1. Call completed successfully → Send summary
2. Callback requested → Send confirmation
3. Document request → Send document links
4. Appointment booked → Send calendar invite
5. No answer → Send intro message
6. Interest shown → Send product info
7. Objection raised → Send FAQ
8. Conversion → Send welcome series

### Template Categories
- Transactional (OTP, confirmations)
- Marketing (offers, promotions)
- Utility (updates, reminders)
- Service (support, FAQs)

## Layer 6: Analytics & Optimization

### Real-time Dashboard Metrics
- Calls initiated (today/week/month)
- Connection rate (%)
- Average call duration
- Conversion funnel stages
- Agent performance
- Cost per acquisition

### Alert System
- HOT lead detected → SMS to sales team
- System error → Slack notification
- Low connection rate → Email alert
- High drop-off → Dashboard warning

## Infrastructure Requirements

### Servers/Services
- Application Server: AWS EC2 / DigitalOcean Droplet
- Database: PostgreSQL / MongoDB
- Cache: Redis
- Queue: RabbitMQ / AWS SQS
- Monitoring: Datadog / New Relic

### Security & Compliance
- Data encryption at rest and in transit
- GDPR/DPDP compliance
- Call recording consent
- Data retention policies
- Access controls and audit logs

## Error Handling & Fallbacks

### Call Failure Scenarios
| Scenario | Fallback Action |
|----------|-----------------|
| Retell API down | Switch to Twilio |
| ElevenLabs timeout | Use Murf.ai |
| LLM rate limit | Retry with exponential backoff |
| Phone network issue | Schedule retry (3 attempts) |
| WhatsApp API down | Send SMS fallback |

### Retry Logic
```python
MAX_RETRIES = 3
RETRY_DELAYS = [300, 1800, 7200]  # 5min, 30min, 2hrs

def make_call_with_retry(lead_data):
    for attempt in range(MAX_RETRIES):
        try:
            result = initiate_call(lead_data)
            if result['success']:
                return result
        except TemporaryError as e:
            if attempt < MAX_RETRIES - 1:
                sleep(RETRY_DELAYS[attempt])
                continue
            raise
    return {'status': 'failed', 'reason': 'max_retries_exceeded'}
```

## Cost Breakdown (Monthly Estimate)

| Service | Usage | Cost (₹) |
|---------|-------|----------|
| Retell AI | 2000 mins | 4,000 |
| ElevenLabs | 100K chars | 2,500 |
| Twilio (India number) | 1 number + usage | 1,500 |
| Zoho CRM | 5 users | 1,250 |
| WhatsApp Business API | 1000 conversations | 200 |
| **Total** | | **₹9,450** |

---

*Next: Part 2 - ElevenLabs Voice Setup*

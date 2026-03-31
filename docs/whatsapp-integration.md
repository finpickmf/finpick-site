# Part 6: WhatsApp Integration

## Overview

WhatsApp Business API integration for automated follow-ups, document sharing, and nurturing sequences in Hindi and Marathi.

---

## 8-Trigger Message Map

| Trigger | When | Template | Language |
|---------|------|----------|----------|
| T1: Call Completed | Immediately after successful call | Summary + Next Steps | Customer's language |
| T2: Callback Requested | After call ends | Confirmation + Time reminder | Customer's language |
| T3: Document Request | When customer asks for info | Product brochure + FAQ | Customer's language |
| T4: Appointment Booked | After scheduling | Calendar invite + Details | Customer's language |
| T5: No Answer | After failed call attempt | Intro + Value proposition | Hindi (default) |
| T6: Interest Shown | After positive conversation | Detailed product info | Customer's language |
| T7: Objection Raised | After specific objection | FAQ + Social proof | Customer's language |
| T8: Conversion | After loan approval | Welcome + Next steps | Customer's language |

---

## Ready-to-Submit Templates

### Template 1: Call Summary (Hindi)

```
Template Name: finpick_call_summary_hi
Category: UTILITY
Language: Hindi

Body:
नमस्ते {{1}} जी! 🙏

फिनपिक से प्रिया ने आपसे बात की थी। यहाँ हमारी चर्चा का सारांश है:

✅ लोन प्रकार: {{2}}
✅ राशि: ₹{{3}}
✅ अगला कदम: {{4}}

आपकी सुविधा के लिए सभी जानकारी इसी चैट में उपलब्ध है।

कोई प्रश्न हो तो इसी नंबर पर WhatsApp करें या कॉल करें: +91-XXXXXXXXXX

धन्यवाद! 🙏
FinPick टीम

Footer: FinPick - Your Trusted Financial Partner
Buttons: 
- Call Us (PHONE_NUMBER)
- Visit Website (URL)
```

### Template 2: Call Summary (Marathi)

```
Template Name: finpick_call_summary_mr
Category: UTILITY
Language: Marathi

Body:
नमस्कार {{1}}! 🙏

फिनपिकची प्रिया तुमच्याशी बोलली होती. येथे आमच्या चर्चेचा सारांश आहे:

✅ कर्जाचा प्रकार: {{2}}
✅ रक्कम: ₹{{3}}
✅ पुढील पायरी: {{4}}

तुमच्या सोयीसाठी सर्व माहिती याच चॅटमध्ये उपलब्ध आहे.

काही प्रश्न असल्यास याच नंबरवर WhatsApp करा किंवा कॉल करा: +91-XXXXXXXXXX

धन्यवाद! 🙏
फिनपिक टीम

Footer: फिनपिक - तुमचा विश्वासू आर्थिक भागीदार
Buttons:
- Call Us (PHONE_NUMBER)
- Visit Website (URL)
```

### Template 3: Callback Confirmation (Hindi)

```
Template Name: finpick_callback_confirm_hi
Category: UTILITY
Language: Hindi

Body:
नमस्ते {{1}} जी! 📞

जैसा कि आपने कहा था, हम आपको {{2}} को {{3}} बजे कॉल करेंगे।

विषय: {{4}} के बारे में चर्चा

हमारे एग्जीक्यूटिव उस समय आपसे संपर्क करेंगे। अगर समय बदलना हो तो कृपया हमें बता दें।

धन्यवाद!
FinPick टीम

Footer: हम आपकी कॉल का इंतज़ार करेंगे
Buttons:
- Reschedule (QUICK_REPLY)
- Cancel (QUICK_REPLY)
```

### Template 4: No Answer Follow-up (Hindi)

```
Template Name: finpick_no_answer_hi
Category: MARKETING
Language: Hindi

Body:
नमस्ते {{1}} जी! 🙏

हमने आपको कॉल करने की कोशिश की थी, पर संपर्क नहीं हो पाया।

मैं फिनपिक से प्रिया बोल रही हूँ। आपने व्यक्तिगत ऋण के बारे में जानकारी मांगी थी।

✨ हमारे खास फायदे:
• 24 घंटे में approval
• केवल 3 documents
• सबसे कम ब्याज दर

क्या मैं आपको कॉल कर सकती हूँ? कृपया बताएं कि कब कॉल करना सुविधाजनक रहेगा।

धन्यवाद!
FinPick टीम

Footer: आपके वित्तीय सपनों का साथी
Buttons:
- Call Me Now (PHONE_NUMBER)
- Send Info (QUICK_REPLY)
- Call Later (QUICK_REPLY)
```

### Template 5: Product Information (Hindi)

```
Template Name: finpick_product_info_hi
Category: MARKETING
Language: Hindi

Body:
नमस्ते {{1}} जी! 💰

आपके लिए {{2}} के बेहतरीन ऑप्शन्स:

📌 लोन राशि: ₹{{3}} से ₹{{4}} तक
📌 ब्याज दर: {{5}}% से शुरू
📌 अवधि: {{6}} महीने तक
📌 प्रोसेसिंग फीस: केवल {{7}}%

✨ क्यों चुनें FinPick?
✓ त्वरित approval
✓ पारदर्शी प्रक्रिया
✓ कोई छुपा चार्ज नहीं

विस्तृत जानकारी के लिए नीचे दिए गए बटन पर क्लिक करें।

FinPick टीम

Footer: सपने पूरे, आसान किश्तों में
Buttons:
- Download Brochure (URL)
- Calculate EMI (URL)
- Talk to Expert (PHONE_NUMBER)
```

### Template 6: Appointment Reminder (Hindi)

```
Template Name: finpick_appointment_reminder_hi
Category: UTILITY
Language: Hindi

Body:
नमस्ते {{1}} जी! 📅

याद दिलाने के लिए: आपकी FinPick के साथ मीटिंग तय हुई है।

🗓️ तारीख: {{2}}
⏰ समय: {{3}}
👤 एग्जीक्यूटिव: {{4}} जी
📍 मोड: {{5}}

कृपया ये documents तैयार रखें:
• Aadhaar Card
• PAN Card
• Income Proof

अगर समय बदलना हो तो कृपया तुरंत बताएं।

धन्यवाद!
FinPick टीम

Footer: हम आपका स्वागत करते हैं
Buttons:
- Confirm (QUICK_REPLY)
- Reschedule (QUICK_REPLY)
```

### Template 7: Objection FAQ (Hindi)

```
Template Name: finpick_faq_rates_hi
Category: UTILITY
Language: Hindi

Body:
नमस्ते {{1}} जी! 📋

आपने ब्याज दरों के बारे में पूछा था। यहाँ विस्तृत जानकारी है:

💳 वैयक्तिक ऋण: 10.5% - 18% p.a.
🏠 गृह ऋण: 8.5% - 12% p.a.
🚗 वाहन ऋण: 9% - 14% p.a.

📊 आपका दर इन पर निर्भर करता है:
• CIBIL स्कोर
• मासिक आय
• नौकरी का प्रकार
• लोन अवधि

✅ अच्छी खबर: अगर आपका CIBIL 750+ है, तो आपको सबसे कम दर मिल सकता है!

विस्तृत कैलकुलेशन के लिए लिंक देखें।

FinPick टीम

Footer: पारदर्शी दर, कोई आश्चर्य नहीं
Buttons:
- Check Eligibility (URL)
- EMI Calculator (URL)
```

### Template 8: Welcome After Approval (Hindi)

```
Template Name: finpick_welcome_hi
Category: UTILITY
Language: Hindi

Body:
बधाई हो {{1}} जी! 🎉

आपका {{2}} approve हो गया है!

✅ स्वीकृत राशि: ₹{{3}}
✅ ब्याज दर: {{4}}% p.a.
✅ अवधि: {{5}} महीने
✅ मासिक EMI: ₹{{6}}

📋 अगले कदम:
1. दस्तावेज़ सत्यापन पूर्ण करें
2. समझौते पर हस्ताक्षर करें
3. राशि आपके खाते में जमा होगी

आपका Relationship Manager: {{7}} जी
संपर्क: {{8}}

FinPick परिवार में आपका स्वागत है! 🙏

Footer: आपके सपनों की उड़ान
Buttons:
- Track Application (URL)
- Contact RM (PHONE_NUMBER)
```

---

## Day 1-30 Follow-up Sequences

### Sequence A: Warm Lead (Showed Interest)

```
Day 0 (Immediate): Call Summary + Product Info
Day 1: Good Morning + Quick Check-in
Day 3: Customer Testimonial (similar profile)
Day 7: Limited Period Offer Alert
Day 14: "Still Thinking?" Gentle Nudge
Day 21: Final Attempt + Alternative Options
Day 30: Breakup Message + Future Open Door
```

**Day 1 Message (Hindi):**
```
शुभ सकाल {{1}} जी! ☀️

उम्मीद है आप ठीक होंगे। कल हमारी जो बात हुई थी, क्या उसके बारे में कुछ सोचा?

अगर कोई सवाल हो तो मैं यहीं हूँ। 😊

- प्रिया, FinPick
```

**Day 7 Message (Hindi):**
```
नमस्ते {{1}} जी! ✨

खुशखबरी! इस महीने के अंत तक {{2}} पर special discount चल रहा है:

🎁 प्रोसेसिंग फीस में 50% छूट
🎁 फ्री लोन इंश्योरेंस

यह ऑफर {{3}} तक ही valid है।

क्या आप इसका फायदा उठाना चाहेंगे?

- FinPick टीम
```

### Sequence B: Cold Lead (Not Interested)

```
Day 0: Thank You Message
Day 15: Market Update + New Products
Day 30: Quarterly Check-in
Day 60: Festival Offer
Day 90: Re-engagement Campaign
```

### Sequence C: No Answer Lead

```
Day 0: No Answer Message
Day 1: Second Attempt Notification
Day 3: Voice Note Introduction
Day 7: Final Call Attempt Notice
Day 14: Move to Nurture Sequence
```

---

## WhatsApp Business API Setup

### Step 1: Choose Provider

| Provider | Setup Fee | Monthly | Per Conversation | Best For |
|----------|-----------|---------|------------------|----------|
| Meta Direct | $0 | $0 | $0.005-0.01 | Large volume |
| Interakt | ₹2999 | ₹2999 | Included | SMBs |
| AiSensy | ₹3500 | ₹3500 | Included | Features |
| WATI | ₹4999 | ₹4999 | Included | Enterprise |

### Step 2: Verification Documents Required

1. Business Registration Certificate
2. GST Number
3. Authorized Signatory ID
4. Business Phone Number
5. Website/Social Media Presence
6. Use Case Description

### Step 3: API Integration Code

```python
import requests

WHATSAPP_API_KEY = "your_api_key"
PHONE_NUMBER_ID = "your_phone_id"

def send_template_message(to_number, template_name, language, parameters):
    """Send WhatsApp template message"""
    
    url = f"https://graph.facebook.com/v17.0/{PHONE_NUMBER_ID}/messages"
    
    headers = {
        "Authorization": f"Bearer {WHATSAPP_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "template",
        "template": {
            "name": template_name,
            "language": {
                "code": language
            },
            "components": [
                {
                    "type": "body",
                    "parameters": parameters
                }
            ]
        }
    }
    
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

# Usage Example
result = send_template_message(
    to_number="919876543210",
    template_name="finpick_call_summary_hi",
    language="hi",
    parameters=[
        {"type": "text", "text": "Rajesh Kumar"},
        {"type": "text", "text": "Personal Loan"},
        {"type": "text", "text": "5,00,000"},
        {"type": "text", "text": "Schedule appointment with advisor"}
    ]
)
```

---

## Cost Estimation

### Monthly Costs (1000 Conversations)

| Component | Cost (₹) |
|-----------|----------|
| WhatsApp Provider | 3,500 |
| Template Messages (1000) | 500 |
| Session Messages (2000) | 0 (included) |
| **Total** | **~4,000** |

### Optimization Tips

1. Use session messages within 24-hour window (free)
2. Batch non-urgent messages
3. Use quick replies instead of new templates
4. Monitor delivery rates and optimize timing

---

*Next: Part 7 - Zoho CRM Integration*

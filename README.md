# FinPick AI Voice Sales System

Complete implementation of an AI-powered voice sales system for Indian financial services market.

## System Overview

- **6-Layer Pipeline**: Instagram Ad → Lead Capture → AI Call → CRM → WhatsApp Follow-up
- **Multilingual Support**: Hindi, Marathi, English
- **Voice AI**: ElevenLabs TTS with custom voice "Priya"
- **Call Infrastructure**: Retell AI / Twilio / Knowlarity
- **AI Brain**: Claude / GPT-4o with specialized sales prompts
- **CRM Integration**: Zoho CRM with automated workflows
- **Automation**: Make.com orchestration

## Directory Structure

```
/workspace
├── README.md
├── docs/
│   ├── architecture.md
│   ├── voice-setup.md
│   ├── call-configuration.md
│   ├── ai-prompt.md
│   ├── objection-handling.md
│   ├── whatsapp-integration.md
│   ├── crm-integration.md
│   ├── automation-logic.md
│   ├── testing-kpis.md
│   └── execution-plan.md
├── src/
│   ├── api/
│   │   ├── elevenlabs_client.py
│   │   ├── retell_client.py
│   │   ├── zoho_crm_client.py
│   │   └── whatsapp_client.py
│   ├── agents/
│   │   └── priya_agent.py
│   ├── prompts/
│   │   └── system_prompt.py
│   └── automation/
│       └── pipeline_orchestrator.py
├── config/
│   ├── voice_settings.json
│   ├── call_config.json
│   ├── crm_workflows.json
│   └── whatsapp_templates.json
├── scripts/
│   ├── test_voice.py
│   ├── test_call.py
│   └── deploy.sh
└── tests/
    ├── test_objections.py
    └── test_pipeline.py
```

## Quick Start

1. Configure API keys in `.env`
2. Set up ElevenLabs voice (see docs/voice-setup.md)
3. Configure Retell AI agent (see docs/call-configuration.md)
4. Deploy automation pipeline (see docs/automation-logic.md)

## Cost & ROI

- **Monthly Cost**: ~₹9,450/month
- **Expected ROI**: 10X at 1% conversion rate
- **Break-even**: ~500 calls/month

## Key Metrics Targets (Month 1)

| Metric | Target |
|--------|--------|
| Call Connection Rate | >65% |
| Average Call Duration | >90 seconds |
| Lead Qualification Rate | >25% |
| Appointment Booking Rate | >8% |
| Conversion Rate | >1% |

---

For detailed implementation guides, see the `docs/` folder.

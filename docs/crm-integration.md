# Part 7: Zoho CRM Integration

## Overview

Complete Zoho CRM integration for lead management, call logging, and automated workflows.

---

## Lead Push API

### Create New Lead

```python
import requests
import json

ZOHO_ACCESS_TOKEN = "your_access_token"
ZOHO_ORG_ID = "your_org_id"

def create_lead(lead_data):
    """Create new lead in Zoho CRM"""
    
    url = "https://www.zohoapis.com/crm/v2/Leads"
    
    headers = {
        "Authorization": f"Zoho-oauthtoken {ZOHO_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "data": [
            {
                "First_Name": lead_data["first_name"],
                "Last_Name": lead_data.get("last_name", ""),
                "Email": lead_data.get("email", ""),
                "Phone": lead_data["phone"],
                "Company": lead_data.get("company", "Individual"),
                "Lead_Source": lead_data["source"],
                "Lead_Status": "New",
                "Description": f"Interest: {lead_data['product_interest']}, Amount: ₹{lead_data['loan_amount']}",
                "City": lead_data.get("city", ""),
                "State": lead_data.get("state", ""),
                "Country": "India",
                "Language_Preference__c": lead_data.get("language", "Hindi"),
                "Loan_Amount_Required__c": lead_data["loan_amount"],
                "Loan_Type__c": lead_data["product_interest"],
                "CIBIL_Score__c": lead_data.get("cibil_score", ""),
                "Monthly_Income__c": lead_data.get("monthly_income", ""),
                "Tags": ["NEW_LEAD", lead_data["product_interest"].upper()]
            }
        ]
    }
    
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

# Usage Example
lead_data = {
    "first_name": "Rajesh",
    "last_name": "Kumar",
    "email": "rajesh@example.com",
    "phone": "+919876543210",
    "source": "Instagram Ads",
    "product_interest": "Personal Loan",
    "loan_amount": "500000",
    "city": "Mumbai",
    "state": "Maharashtra",
    "language": "Hindi"
}

result = create_lead(lead_data)
print(result)
```

### Response Format

```json
{
  "data": [
    {
      "code": "SUCCESS",
      "details": {
        "Modified_Time": "2024-01-15T10:30:00+05:30",
        "Modified_By": {"name": "System", "id": "xxxxx"},
        "Created_Time": "2024-01-15T10:30:00+05:30",
        "id": "1234567890123456789",
        "Created_By": {"name": "API User", "id": "xxxxx"},
        "$approval_state": "approved"
      },
      "message": "record added",
      "status": "success"
    }
  ]
}
```

---

## Post-Call Update API

### Update Lead Status After Call

```python
def update_lead_after_call(lead_id, call_result):
    """Update lead with call outcome"""
    
    url = f"https://www.zohoapis.com/crm/v2/Leads/{lead_id}"
    
    headers = {
        "Authorization": f"Zoho-oauthtoken {ZOHO_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    
    # Map call result to Zoho fields
    status_mapping = {
        "hot": {"Lead_Status": "Hot Lead", "Tags": ["HOT", "CALL_COMPLETED"]},
        "warm": {"Lead_Status": "Warm Lead", "Tags": ["WARM", "CALL_COMPLETED"]},
        "cold": {"Lead_Status": "Cold Lead", "Tags": ["COLD", "CALL_COMPLETED"]},
        "callback": {"Lead_Status": "Contacted - Callback", "Tags": ["CALLBACK", "CALL_COMPLETED"]},
        "no_answer": {"Lead_Status": "Contacted - No Answer", "Tags": ["NO_ANSWER", "RETRY_NEEDED"]},
        "wrong_number": {"Lead_Status": "Invalid Contact", "Tags": ["WRONG_NUMBER"]},
        "dnr": {"Lead_Status": "Do Not Contact", "Tags": ["DNC"]}
    }
    
    update_data = status_mapping.get(call_result["status"], {})
    update_data.update({
        "Last_Call_Date__c": call_result["call_date"],
        "Call_Duration__c": str(call_result["duration_seconds"]),
        "Call_Summary__c": call_result["summary"],
        "Sentiment__c": call_result["sentiment"],
        "Next_Follow_Up_Date__c": call_result.get("next_followup", ""),
        "Interested_Product__c": call_result.get("product_interest", ""),
        "Loan_Amount_Discussed__c": call_result.get("amount_discussed", "")
    })
    
    payload = {
        "data": [update_data]
    }
    
    response = requests.put(url, headers=headers, json=payload)
    return response.json()

# Usage Example
call_result = {
    "status": "hot",
    "call_date": "2024-01-15T11:00:00+05:30",
    "duration_seconds": 145,
    "summary": "Customer interested in ₹5L personal loan. Good CIBIL score. Wants appointment tomorrow.",
    "sentiment": "positive",
    "next_followup": "2024-01-16T10:00:00+05:30",
    "product_interest": "Personal Loan",
    "amount_discussed": "500000"
}

result = update_lead_after_call("1234567890123456789", call_result)
```

### Log Call Activity

```python
def log_call_activity(lead_id, call_details):
    """Log call as activity in Zoho CRM"""
    
    url = "https://www.zohoapis.com/crm/v2/Calls"
    
    headers = {
        "Authorization": f"Zoho-oauthtoken {ZOHO_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "data": [
            {
                "Call_Type": "Outbound",
                "Call_Start_Time": call_details["start_time"],
                "Call_Duration": str(call_details["duration_seconds"]),
                "Description": call_details["summary"],
                "Call_Result": call_details["result"],
                "Call_Purpose": "Sales Qualification",
                "What_Id": lead_id,  # Link to lead
                "Subject": f"AI Call - {call_details['agent_name']}",
                "Status": "Completed",
                "Notes": f"Sentiment: {call_details['sentiment']}\nTranscript: {call_details.get('transcript_url', '')}"
            }
        ]
    }
    
    response = requests.post(url, headers=headers, json=payload)
    return response.json()
```

---

## 7-Tag System

| Tag | Color | Description | Auto-Applied When |
|-----|-------|-------------|-------------------|
| HOT | Red | Ready to convert | Customer expresses immediate interest, good credit |
| WARM | Orange | Needs nurturing | Shows interest but needs time/follow-up |
| COLD | Grey | Not interested | Explicitly declined or not eligible |
| CALLBACK | Yellow | Requested callback | Asked to call back at specific time |
| NO_ANSWER | Blue | Didn't pick up | Call not answered (retry needed) |
| WRONG_NUMBER | Brown | Invalid contact | Number unreachable/wrong |
| DNC | Black | Do not call | Requested no further contact |

### Tag Application Logic

```python
def apply_tags(lead_id, tags):
    """Apply multiple tags to a lead"""
    
    url = f"https://www.zohoapis.com/crm/v2/Leads/{lead_id}/tags"
    
    headers = {
        "Authorization": f"Zoho-oauthtoken {ZOHO_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "tags": tags
    }
    
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

# Remove tags
def remove_tags(lead_id, tags):
    """Remove specific tags from lead"""
    
    url = f"https://www.zohoapis.com/crm/v2/Leads/{lead_id}/tags?names={','.join(tags)}"
    
    headers = {
        "Authorization": f"Zoho-oauthtoken {ZOHO_ACCESS_TOKEN}"
    }
    
    response = requests.delete(url, headers=headers)
    return response.json()
```

---

## 3 Automated Workflow Rules

### Workflow 1: HOT Lead Alert

**Trigger:** Lead tagged as HOT

**Actions:**
1. Send instant SMS to sales manager
2. Create high-priority task for senior advisor
3. Send WhatsApp to customer with priority badge
4. Add to "Hot Leads" dashboard view

**Workflow Configuration:**
```json
{
  "workflow_name": "HOT_Lead_Alert",
  "trigger": {
    "module": "Leads",
    "event": "on_tag_add",
    "condition": "Tags contains 'HOT'"
  },
  "actions": [
    {
      "type": "sms",
      "to": "+91XXXXXXXXXX",
      "message": "🔥 HOT Lead Alert! {{Lead.First_Name}} {{Lead.Last_Name}} interested in {{Lead.Loan_Type__c}}. Call immediately!"
    },
    {
      "type": "task",
      "subject": "URGENT: Follow up with HOT lead - {{Lead.First_Name}}",
      "due_date": "+2 hours",
      "priority": "High",
      "assign_to": "Senior Advisor"
    },
    {
      "type": "whatsapp",
      "template": "finpick_priority_hi",
      "parameters": ["{{Lead.First_Name}}"]
    }
  ]
}
```

### Workflow 2: WARM Lead Follow-up

**Trigger:** Lead tagged as WARM

**Actions:**
1. Create follow-up task for 2 days later
2. Add to nurture email sequence
3. Schedule WhatsApp Day 3 message
4. Update lead score

**Workflow Configuration:**
```json
{
  "workflow_name": "WARM_Lead_Nurture",
  "trigger": {
    "module": "Leads",
    "event": "on_tag_add",
    "condition": "Tags contains 'WARM'"
  },
  "actions": [
    {
      "type": "task",
      "subject": "Follow up with WARM lead - {{Lead.First_Name}}",
      "due_date": "+2 days",
      "priority": "Normal",
      "assign_to": "{{Lead:Owner}}"
    },
    {
      "type": "blueprint",
      "process": "Warm_Lead_Nurture_Sequence",
      "transition": "Start_Nurture"
    },
    {
      "type": "field_update",
      "field": "Lead_Score__c",
      "value": "{{Lead:Lead_Score__c}} + 20"
    }
  ]
}
```

### Workflow 3: No-Answer Retry

**Trigger:** Lead tagged as NO_ANSWER

**Actions:**
1. Wait 4 hours
2. Retry call (max 3 attempts)
3. If still no answer → send WhatsApp
4. After 3 failed attempts → tag as COLD

**Workflow Configuration:**
```json
{
  "workflow_name": "No_Answer_Retry",
  "trigger": {
    "module": "Leads",
    "event": "on_tag_add",
    "condition": "Tags contains 'NO_ANSWER'"
  },
  "actions": [
    {
      "type": "wait",
      "duration": "4 hours"
    },
    {
      "type": "function",
      "name": "check_retry_count",
      "conditions": [
        {
          "if": "Retry_Count__c < 3",
          "then": [
            {
              "type": "function",
              "name": "initiate_retry_call"
            },
            {
              "type": "field_update",
              "field": "Retry_Count__c",
              "value": "{{Lead:Retry_Count__c}} + 1"
            }
          ],
          "else": [
            {
              "type": "tag_add",
              "tags": ["COLD", "MAX_RETRIES_EXCEEDED"]
            },
            {
              "type": "tag_remove",
              "tags": ["NO_ANSWER", "RETRY_NEEDED"]
            },
            {
              "type": "whatsapp",
              "template": "finpick_final_attempt_hi"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Custom Fields Setup

Create these custom fields in Leads module:

| Field Label | API Name | Type | Required |
|-------------|----------|------|----------|
| Language Preference | Language_Preference__c | Picklist | No |
| Loan Amount Required | Loan_Amount_Required__c | Currency | Yes |
| Loan Type | Loan_Type__c | Picklist | Yes |
| CIBIL Score | CIBIL_Score__c | Number | No |
| Monthly Income | Monthly_Income__c | Currency | No |
| Last Call Date | Last_Call_Date__c | DateTime | No |
| Call Duration | Call_Duration__c | Number | No |
| Call Summary | Call_Summary__c | Long Text | No |
| Sentiment | Sentiment__c | Picklist | No |
| Next Follow-Up Date | Next_Follow_Up_Date__c | DateTime | No |
| Retry Count | Retry_Count__c | Number | No |
| Lead Score | Lead_Score__c | Number | No |

---

## Dashboard Views

### View 1: Today's Hot Leads
```sql
SELECT First_Name, Last_Name, Phone, Loan_Type__c, Loan_Amount_Required__c 
FROM Leads 
WHERE Tags CONTAINS 'HOT' 
AND Created_Time >= TODAY
ORDER BY Created_Time DESC
```

### View 2: Pending Follow-ups
```sql
SELECT First_Name, Last_Name, Phone, Next_Follow_Up_Date__c, Lead_Status 
FROM Leads 
WHERE Next_Follow_Up_Date__c <= TODAY 
AND Lead_Status NOT IN ('Converted', 'Closed Lost')
ORDER BY Next_Follow_Up_Date__c ASC
```

### View 3: No Answer Retries
```sql
SELECT First_Name, Last_Name, Phone, Retry_Count__c, Last_Call_Date__c 
FROM Leads 
WHERE Tags CONTAINS 'NO_ANSWER' 
ORDER BY Last_Call_Date__c ASC
```

---

*Next: Part 8 - Automation Logic*

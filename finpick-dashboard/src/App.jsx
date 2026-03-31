import React, { useState } from 'react'
import { Phone, MessageCircle, Users, BarChart3, Settings, Play, TrendingUp, Clock, CheckCircle } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = {
    totalCalls: 847,
    conversionRate: 3.2,
    hotLeads: 27,
    avgCallDuration: '4m 32s'
  }

  const recentLeads = [
    { name: 'Rajesh Kumar', phone: '+91 98765 43210', interest: 'Personal Loan', status: 'hot', time: '2 min ago' },
    { name: 'Priya Sharma', phone: '+91 87654 32109', interest: 'Credit Card', status: 'warm', time: '5 min ago' },
    { name: 'Amit Patel', phone: '+91 76543 21098', interest: 'Home Loan', status: 'hot', time: '12 min ago' },
    { name: 'Sneha Desai', phone: '+91 65432 10987', interest: 'Investment', status: 'cold', time: '18 min ago' },
    { name: 'Vikram Singh', phone: '+91 54321 09876', interest: 'Personal Loan', status: 'warm', time: '25 min ago' }
  ]

  const activities = [
    { type: 'call', title: 'AI call completed with Rajesh Kumar', detail: 'Interested in ₹5L personal loan', time: '2 min ago' },
    { type: 'whatsapp', title: 'WhatsApp sent to Priya Sharma', detail: 'Loan comparison document shared', time: '5 min ago' },
    { type: 'crm', title: 'Lead updated in Zoho CRM', detail: 'Vikram Singh tagged as WARM', time: '8 min ago' },
    { type: 'call', title: 'AI call completed with Amit Patel', detail: 'Requested home loan callback', time: '12 min ago' },
    { type: 'whatsapp', title: 'Follow-up sent to Sneha Desai', detail: 'Investment brochure shared', time: '18 min ago' }
  ]

  const chartData = [
    { day: 'Mon', calls: 45, conversions: 2 },
    { day: 'Tue', calls: 52, conversions: 3 },
    { day: 'Wed', calls: 38, conversions: 1 },
    { day: 'Thu', calls: 67, conversions: 4 },
    { day: 'Fri', calls: 71, conversions: 5 },
    { day: 'Sat', calls: 58, conversions: 3 },
    { day: 'Sun', calls: 43, conversions: 2 }
  ]

  const config = {
    voiceAgent: 'Priya (Hindi/Marathi)',
    phoneNumber: '+91 22 4567 8901',
    crmStatus: 'Connected',
    whatsappStatus: 'Active',
    dailyBudget: '₹1,500',
    targetConversions: 15
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">FP</div>
          <span className="logo-text">FinPick AI</span>
        </div>
        <ul className="nav-menu">
          <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </li>
          <li className={`nav-item ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
            <Users size={20} />
            <span>Leads</span>
          </li>
          <li className={`nav-item ${activeTab === 'calls' ? 'active' : ''}`} onClick={() => setActiveTab('calls')}>
            <Phone size={20} />
            <span>Calls</span>
          </li>
          <li className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            <MessageCircle size={20} />
            <span>Messages</span>
          </li>
          <li className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} />
            <span>Settings</span>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>AI Voice Sales Dashboard</h1>
          <div className="action-buttons">
            <button className="btn btn-secondary">
              <Clock size={18} />
              View Reports
            </button>
            <button className="btn btn-primary">
              <Play size={18} />
              Start Campaign
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Calls Today</div>
            <div className="stat-value">{stats.totalCalls}</div>
            <div className="stat-change positive">
              <TrendingUp size={14} style={{display: 'inline', marginRight: 4}} />
              +12% from yesterday
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Conversion Rate</div>
            <div className="stat-value">{stats.conversionRate}%</div>
            <div className="stat-change positive">
              <TrendingUp size={14} style={{display: 'inline', marginRight: 4}} />
              +0.8% this week
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Hot Leads</div>
            <div className="stat-value">{stats.hotLeads}</div>
            <div className="stat-change positive">
              <CheckCircle size={14} style={{display: 'inline', marginRight: 4}} />
              Ready for follow-up
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg Call Duration</div>
            <div className="stat-value">{stats.avgCallDuration}</div>
            <div className="stat-change negative">
              -18s from target
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="chart-card">
            <div className="card-header">
              <h3 className="card-title">Weekly Performance</h3>
            </div>
            <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingTop: '20px' }}>
              {chartData.map((item, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '100%', 
                    height: `${(item.calls / 80) * 180}px`, 
                    background: 'linear-gradient(180deg, #00d9ff, #00ff88)',
                    borderRadius: '8px 8px 0 0',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      bottom: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                      color: '#666'
                    }}>{item.day}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 12, height: 12, background: 'linear-gradient(180deg, #00d9ff, #00ff88)', borderRadius: 4 }}></div>
                <span style={{ fontSize: 14, color: '#666' }}>Calls Made</span>
              </div>
            </div>
          </div>

          <div className="leads-card">
            <div className="card-header">
              <h3 className="card-title">Recent Leads</h3>
            </div>
            {recentLeads.map((lead, index) => (
              <div key={index} className="lead-item">
                <div className="lead-avatar">{lead.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="lead-info">
                  <div className="lead-name">{lead.name}</div>
                  <div className="lead-detail">{lead.interest} • {lead.phone}</div>
                </div>
                <span className={`status-badge status-${lead.status}`}>{lead.status.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-activity">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
          </div>
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {activity.type === 'call' && '📞'}
                {activity.type === 'whatsapp' && '💬'}
                {activity.type === 'crm' && '📊'}
              </div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-time">{activity.detail} • {activity.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="config-section" style={{ marginTop: 24 }}>
          <div className="card-header">
            <h3 className="card-title">System Configuration</h3>
          </div>
          <div className="config-grid">
            <div className="config-item">
              <div className="config-label">Voice Agent</div>
              <div className="config-value">{config.voiceAgent}</div>
            </div>
            <div className="config-item">
              <div className="config-label">Phone Number</div>
              <div className="config-value">{config.phoneNumber}</div>
            </div>
            <div className="config-item">
              <div className="config-label">CRM Integration</div>
              <div><span className="status-indicator status-active"><span className="dot"></span>{config.crmStatus}</span></div>
            </div>
            <div className="config-item">
              <div className="config-label">WhatsApp Business</div>
              <div><span className="status-indicator status-active"><span className="dot"></span>{config.whatsappStatus}</span></div>
            </div>
            <div className="config-item">
              <div className="config-label">Daily Ad Budget</div>
              <div className="config-value">{config.dailyBudget}</div>
            </div>
            <div className="config-item">
              <div className="config-label">Daily Target</div>
              <div className="config-value">{config.targetConversions} conversions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

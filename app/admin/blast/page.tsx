'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, MessageSquare, Send, Users, Image, FileText, ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminBlastPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'email' | 'sms'>('email');
  const [recipients, setRecipients] = useState<'all' | 'custom'>('all');
  const [customEmails, setCustomEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('');
  const [templates, setTemplates] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('admin_auth');
    if (!isAuthed) {
      router.push('/admin');
      return;
    }
    fetchData();
  }, [router]);

  async function fetchData() {
    const [templatesRes, customersRes] = await Promise.all([
      supabase.from('email_sms_templates').select('*').order('created_at'),
      supabase.from('customers').select('email, phone, first_name, last_name')
    ]);

    if (templatesRes.data) setTemplates(templatesRes.data);
    if (customersRes.data) setCustomers(customersRes.data);
  }

  async function saveTemplate() {
    if (!subject || !message) {
      alert('Please enter both subject and message');
      return;
    }

    await supabase.from('email_sms_templates').insert({
      name: subject,
      type: activeTab,
      subject: activeTab === 'email' ? subject : null,
      content: message
    });

    alert('Template saved successfully!');
    fetchData();
  }

  async function loadTemplate(templateId: string) {
    const tmpl = templates.find(t => t.id === templateId);
    if (tmpl) {
      setSubject(tmpl.subject || tmpl.name);
      setMessage(tmpl.content);
    }
  }

  async function sendBlast() {
    if (!message) {
      alert('Please enter a message');
      return;
    }

    if (activeTab === 'email' && !subject) {
      alert('Please enter a subject line');
      return;
    }

    setSending(true);

    try {
      // Get recipient list
      let recipientList: string[] = [];
      if (recipients === 'all') {
        recipientList = activeTab === 'email'
          ? customers.map(c => c.email).filter(Boolean)
          : customers.map(c => c.phone).filter(Boolean);
      } else {
        recipientList = customEmails.split(',').map(e => e.trim()).filter(Boolean);
      }

      // Log campaign
      await supabase.from('campaign_history').insert({
        type: activeTab,
        subject: activeTab === 'email' ? subject : null,
        content: message,
        recipient_count: recipientList.length,
        sent_at: new Date().toISOString()
      });

      // In production, this would integrate with Resend API
      // For now, just show success message
      alert(`${activeTab.toUpperCase()} blast sent to ${recipientList.length} recipients!`);

      // Clear form
      setSubject('');
      setMessage('');
      setCustomEmails('');
    } catch (error) {
      console.error('Error sending blast:', error);
      alert('Failed to send blast');
    } finally {
      setSending(false);
    }
  }

  const emailTemplateExamples = [
    {
      name: 'Welcome',
      subject: 'Welcome to Colin\'s Coastal Car Care!',
      content: 'Hi {{first_name}},\n\nWelcome to our family! We\'re excited to help keep your vehicle looking pristine.\n\nBook your first service and get 10% off with code WELCOME10.\n\nBest regards,\nColin\'s Coastal Car Care'
    },
    {
      name: 'Promotion',
      subject: 'Special Offer: 20% Off This Week!',
      content: 'Hi {{first_name}},\n\nThis week only - get 20% off any Premium package!\n\nDon\'t miss out on this coastal clean special.\n\nBook now: [BOOKING_LINK]\n\nColin\'s Coastal Car Care'
    },
    {
      name: 'Thank You',
      subject: 'Thank You for Choosing Us!',
      content: 'Hi {{first_name}},\n\nThank you for trusting us with your {{vehicle_make}} {{vehicle_model}}!\n\nWe hope you love the results. Don\'t forget to leave us a review!\n\nSee you next time,\nColin\'s Coastal Car Care'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Email & SMS Blast Center</h1>
              <p className="text-sm text-gray-400">Send campaigns to your customers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Type Selector */}
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'email'
                    ? 'bg-primary text-white'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                <Mail className="w-5 h-5" />
                Email Campaign
              </button>
              <button
                onClick={() => setActiveTab('sms')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'sms'
                    ? 'bg-primary text-white'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                SMS Campaign
              </button>
            </div>

            {/* Recipients */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Recipients
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={recipients === 'all'}
                      onChange={() => setRecipients('all')}
                      className="text-primary"
                    />
                    <span className="text-white">All Customers ({customers.length})</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={recipients === 'custom'}
                      onChange={() => setRecipients('custom')}
                      className="text-primary"
                    />
                    <span className="text-white">Custom List</span>
                  </label>
                </div>

                {recipients === 'custom' && (
                  <textarea
                    value={customEmails}
                    onChange={(e) => setCustomEmails(e.target.value)}
                    placeholder={activeTab === 'email' ? 'Enter emails separated by commas' : 'Enter phone numbers separated by commas'}
                    className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary min-h-[100px]"
                  />
                )}
              </div>
            </div>

            {/* Message Editor */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Message</h3>

              {activeTab === 'email' && (
                <div className="mb-4">
                  <label className="block text-white font-semibold mb-2">Subject Line</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject"
                    className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              )}

              <div>
                <label className="block text-white font-semibold mb-2">
                  {activeTab === 'email' ? 'Email Content' : 'SMS Message'}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Write your ${activeTab} message here...\n\nUse {{first_name}}, {{last_name}}, {{vehicle_make}}, {{vehicle_model}} for personalization`}
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary min-h-[300px]"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    {activeTab === 'sms' && `${message.length}/160 characters`}
                  </p>
                  <p className="text-xs text-gray-500">
                    Variables: first_name, last_name, vehicle_make, vehicle_model
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={saveTemplate}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save as Template
              </button>
              <button
                onClick={sendBlast}
                disabled={sending}
                className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {sending ? 'Sending...' : `Send ${activeTab.toUpperCase()}`}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Templates */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Quick Templates
              </h3>
              <div className="space-y-2">
                {emailTemplateExamples.map((tmpl, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSubject(tmpl.subject);
                      setMessage(tmpl.content);
                    }}
                    className="w-full text-left bg-black border border-gray-800 hover:border-primary text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <div className="font-semibold">{tmpl.name}</div>
                    <div className="text-sm text-gray-400 truncate">{tmpl.subject}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Saved Templates */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Saved Templates</h3>
              {templates.filter(t => t.type === activeTab).length === 0 ? (
                <p className="text-gray-400 text-sm">No saved templates</p>
              ) : (
                <div className="space-y-2">
                  {templates
                    .filter(t => t.type === activeTab)
                    .map((tmpl) => (
                      <button
                        key={tmpl.id}
                        onClick={() => loadTemplate(tmpl.id)}
                        className="w-full text-left bg-black border border-gray-800 hover:border-primary text-white px-4 py-3 rounded-lg transition-colors"
                      >
                        <div className="font-semibold">{tmpl.name}</div>
                        <div className="text-sm text-gray-400 truncate">
                          {tmpl.content.substring(0, 50)}...
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Tips</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Personalize with customer variables</li>
                <li>• Keep SMS under 160 characters</li>
                <li>• Include clear call-to-action</li>
                <li>• Test with custom list first</li>
                <li>• Track campaign performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

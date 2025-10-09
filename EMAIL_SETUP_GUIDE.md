# Email Confirmation System - Setup Guide

## ✅ What's Been Implemented

Your booking system now includes a complete email confirmation system that will:

1. **Send customer confirmation emails** - Beautiful HTML emails to customers confirming their booking
2. **Send admin notification emails** - Alert you when a new booking is created
3. **Automatic integration** - Emails are sent automatically when a booking is confirmed

## 📋 What You Need to Do

To activate email confirmations, you need to configure **Resend** (a free email service):

### Step 1: Sign up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Click "Start Building for Free"
3. Sign up with your email (it's completely free for up to 3,000 emails/month)

### Step 2: Get Your API Key

1. After signing up, go to the Resend dashboard
2. Click on "API Keys" in the left sidebar
3. Click "Create API Key"
4. Name it "Colin's Coastal Car Care"
5. Copy the API key (starts with `re_`)

### Step 3: Add Your Domain (Optional but Recommended)

For professional emails from `bookings@colinscoastalcarcare.com`:

1. In Resend dashboard, click "Domains"
2. Click "Add Domain"
3. Enter your domain: `colinscoastalcarcare.com`
4. Follow their instructions to add DNS records
5. Wait for verification (usually takes a few minutes)

**OR** use Resend's test domain for now:
- Emails will come from `onboarding@resend.dev`
- Perfect for testing before you set up your domain

### Step 4: Configure Your Environment Variables

Open your `.env.local` file and add:

```env
# Resend Email Configuration
RESEND_API_KEY=re_your_api_key_here

# Your email to receive booking notifications
ADMIN_EMAIL=your-email@gmail.com
```

**Replace:**
- `re_your_api_key_here` with your actual Resend API key
- `your-email@gmail.com` with the email where you want to receive booking notifications

### Step 5: Update Email Sender (if using custom domain)

If you verified your own domain in Resend:

1. Open `/app/api/send-booking-confirmation/route.ts`
2. Find this line (appears twice):
   ```typescript
   from: 'Colin\'s Coastal Car Care <bookings@colinscoastalcarcare.com>',
   ```
3. Change it to match your verified domain

If using Resend's test domain, change to:
```typescript
from: 'Colin\'s Coastal Car Care <onboarding@resend.dev>',
```

## 🧪 Testing

Once configured, test the system:

```bash
# Make sure your dev server is running
pnpm dev

# In another terminal, run the test:
node scripts/test-email-system.js
```

This will:
1. Create a test customer
2. Create a test quote
3. Create a test booking
4. Send confirmation emails

Check your inbox for the test emails!

## 📧 What the Emails Look Like

### Customer Confirmation Email
- **Subject:** "Booking Confirmation - Colin's Coastal Car Care"
- **Includes:**
  - Booking date and time
  - Vehicle information
  - Service location
  - Total price
  - Selected add-ons
  - Contact information

### Admin Notification Email
- **Subject:** "New Booking: [Customer Name] - [Date]"
- **Includes:**
  - Customer contact info (clickable phone/email)
  - Complete booking details
  - Customer notes
  - Booking ID for reference

## 🎨 Email Templates

The email templates are located in:
- `/lib/emails/booking-confirmation.tsx` - Customer email
- `/lib/emails/admin-notification.tsx` - Admin notification

These are fully customizable React components with your brand colors (dark red #8B0000).

## 💰 Pricing

Resend is **FREE** for:
- Up to 3,000 emails per month
- Up to 100 emails per day

This is more than enough for a car detailing business. If you grow beyond this, paid plans start at $20/month for 50,000 emails.

## ✅ Checklist

- [ ] Sign up for Resend account
- [ ] Get API key from Resend dashboard
- [ ] Add `RESEND_API_KEY` to `.env.local`
- [ ] Add `ADMIN_EMAIL` to `.env.local`
- [ ] (Optional) Verify custom domain in Resend
- [ ] Update email sender if using custom domain
- [ ] Run test script to verify emails work
- [ ] Create a real test booking to confirm

## 🚨 Troubleshooting

**Emails not sending?**
- Check that `RESEND_API_KEY` is set in `.env.local`
- Restart your dev server after adding environment variables
- Check Resend dashboard for any errors
- Make sure you're not using a free email domain (Gmail, Yahoo) in the "from" field without domain verification

**Getting domain errors?**
- Use `onboarding@resend.dev` as the sender until you verify your domain
- Or verify your domain following Resend's DNS setup guide

**Not receiving emails?**
- Check spam folder
- Verify `ADMIN_EMAIL` is set correctly
- Check Resend dashboard logs to see if emails were sent

## 📞 Need Help?

Contact Resend support at [https://resend.com/support](https://resend.com/support) - they're very responsive!

---

**Once configured, your booking system will automatically send beautiful confirmation emails to your customers! 🎉**

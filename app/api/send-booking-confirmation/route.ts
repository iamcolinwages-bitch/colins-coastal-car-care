import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { BookingConfirmationEmail } from '@/lib/emails/booking-confirmation';
import { AdminNotificationEmail } from '@/lib/emails/admin-notification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      vehicleInfo,
      scheduledDate,
      scheduledTime,
      totalPrice,
      address,
      city,
      selectedAddons = [],
      notes,
      bookingId,
    } = body;

    // Validate required fields
    if (!customerEmail || !customerName || !vehicleInfo || !scheduledDate || !scheduledTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format date for better readability
    const formattedDate = new Date(scheduledDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Format time for better readability
    const formattedTime = new Date(`2000-01-01T${scheduledTime}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const emails = [];

    // Send confirmation email to customer
    try {
      const customerEmailHtml = render(
        <BookingConfirmationEmail
          customerName={customerName}
          vehicleInfo={vehicleInfo}
          scheduledDate={formattedDate}
          scheduledTime={formattedTime}
          totalPrice={totalPrice}
          address={address}
          city={city}
          selectedAddons={selectedAddons}
        />
      );

      const customerEmailResult = await resend.emails.send({
        from: 'Colin\'s Coastal Car Care <onboarding@resend.dev>',
        to: customerEmail,
        subject: 'Booking Confirmation - Colin\'s Coastal Car Care',
        html: customerEmailHtml,
      });
      emails.push({ type: 'customer', result: customerEmailResult });
    } catch (error) {
      console.error('Failed to send customer email:', error);
      // Continue to try sending admin email even if customer email fails
    }

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'colin@colinscoastalcarcare.com';
    try {
      const adminEmailHtml = render(
        <AdminNotificationEmail
          customerName={customerName}
          customerEmail={customerEmail}
          customerPhone={customerPhone}
          vehicleInfo={vehicleInfo}
          scheduledDate={formattedDate}
          scheduledTime={formattedTime}
          totalPrice={totalPrice}
          address={address}
          city={city}
          selectedAddons={selectedAddons}
          notes={notes}
          bookingId={bookingId}
        />
      );

      const adminEmailResult = await resend.emails.send({
        from: 'Colin\'s Coastal Car Care <onboarding@resend.dev>',
        to: adminEmail,
        subject: `New Booking: ${customerName} - ${formattedDate}`,
        html: adminEmailHtml,
      });
      emails.push({ type: 'admin', result: adminEmailResult });
    } catch (error) {
      console.error('Failed to send admin email:', error);
    }

    // If both emails failed, return error
    if (emails.length === 0) {
      return NextResponse.json(
        { error: 'Failed to send emails' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking confirmation emails sent',
        emails,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return NextResponse.json(
      { error: 'Failed to send booking confirmation' },
      { status: 500 }
    );
  }
}

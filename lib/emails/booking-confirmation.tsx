import * as React from 'react';

interface BookingConfirmationEmailProps {
  customerName: string;
  vehicleInfo: string;
  scheduledDate: string;
  scheduledTime: string;
  totalPrice: number;
  address: string;
  city: string;
  selectedAddons: string[];
}

export const BookingConfirmationEmail: React.FC<BookingConfirmationEmailProps> = ({
  customerName,
  vehicleInfo,
  scheduledDate,
  scheduledTime,
  totalPrice,
  address,
  city,
  selectedAddons,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#8B0000', color: 'white', padding: '30px', textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '28px' }}>Colin's Coastal Car Care</h1>
      <p style={{ margin: '10px 0 0 0', fontSize: '16px' }}>Booking Confirmation</p>
    </div>

    <div style={{ padding: '30px', backgroundColor: '#f9f9f9' }}>
      <p style={{ fontSize: '18px', color: '#333' }}>Hi {customerName},</p>

      <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
        Thank you for choosing Colin's Coastal Car Care! Your appointment has been confirmed.
      </p>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h2 style={{ color: '#8B0000', fontSize: '20px', marginTop: 0 }}>Appointment Details</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Date:</td>
            <td style={{ padding: '10px 0', color: '#333' }}>{scheduledDate}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Time:</td>
            <td style={{ padding: '10px 0', color: '#333' }}>{scheduledTime}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Vehicle:</td>
            <td style={{ padding: '10px 0', color: '#333' }}>{vehicleInfo}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Location:</td>
            <td style={{ padding: '10px 0', color: '#333' }}>{address}, {city}</td>
          </tr>
          {selectedAddons.length > 0 && (
            <tr>
              <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Add-ons:</td>
              <td style={{ padding: '10px 0', color: '#333' }}>{selectedAddons.join(', ')}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Total:</td>
            <td style={{ padding: '10px 0', color: '#8B0000', fontSize: '18px', fontWeight: 'bold' }}>
              ${totalPrice.toFixed(2)}
            </td>
          </tr>
        </table>
      </div>

      <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
        <p style={{ margin: 0, color: '#856404', fontSize: '14px' }}>
          <strong>Important:</strong> Please ensure your vehicle is accessible at the scheduled time.
          We'll contact you 24 hours before your appointment to confirm.
        </p>
      </div>

      <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
        If you need to reschedule or have any questions, please contact us at:
      </p>

      <p style={{ fontSize: '16px', color: '#333' }}>
        <strong>Phone:</strong> (239) 555-0100<br />
        <strong>Email:</strong> info@colinscoastalcarcare.com
      </p>

      <p style={{ fontSize: '16px', color: '#666', marginTop: '30px' }}>
        We look forward to serving you!<br />
        <strong style={{ color: '#8B0000' }}>Colin's Coastal Car Care Team</strong>
      </p>
    </div>

    <div style={{ backgroundColor: '#333', color: '#999', padding: '20px', textAlign: 'center', fontSize: '12px' }}>
      <p style={{ margin: 0 }}>Colin's Coastal Car Care | Naples, FL</p>
      <p style={{ margin: '5px 0 0 0' }}>Professional Mobile Detailing Services</p>
    </div>
  </div>
);

export default BookingConfirmationEmail;

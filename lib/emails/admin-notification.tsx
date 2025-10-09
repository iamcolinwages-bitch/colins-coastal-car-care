import * as React from 'react';

interface AdminNotificationEmailProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleInfo: string;
  scheduledDate: string;
  scheduledTime: string;
  totalPrice: number;
  address: string;
  city: string;
  selectedAddons: string[];
  notes?: string;
  bookingId: string;
}

export const AdminNotificationEmail: React.FC<AdminNotificationEmailProps> = ({
  customerName,
  customerEmail,
  customerPhone,
  vehicleInfo,
  scheduledDate,
  scheduledTime,
  totalPrice,
  address,
  city,
  selectedAddons,
  notes,
  bookingId,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ backgroundColor: '#8B0000', color: 'white', padding: '30px', textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '28px' }}>New Booking Alert</h1>
      <p style={{ margin: '10px 0 0 0', fontSize: '16px' }}>Colin's Coastal Car Care</p>
    </div>

    <div style={{ padding: '30px', backgroundColor: '#f9f9f9' }}>
      <div style={{ backgroundColor: '#d4edda', border: '1px solid #28a745', padding: '15px', borderRadius: '8px', margin: '0 0 20px 0' }}>
        <p style={{ margin: 0, color: '#155724', fontSize: '16px', fontWeight: 'bold' }}>
          🎉 New booking received! Booking ID: {bookingId}
        </p>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h2 style={{ color: '#8B0000', fontSize: '20px', marginTop: 0 }}>Customer Information</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Name:</td>
            <td style={{ padding: '10px 0', color: '#333' }}>{customerName}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Email:</td>
            <td style={{ padding: '10px 0', color: '#333' }}>
              <a href={`mailto:${customerEmail}`} style={{ color: '#8B0000' }}>{customerEmail}</a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Phone:</td>
            <td style={{ padding: '10px 0', color: '#333' }}>
              <a href={`tel:${customerPhone}`} style={{ color: '#8B0000' }}>{customerPhone}</a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Address:</td>
            <td style={{ padding: '10px 0', color: '#333' }}>{address}, {city}</td>
          </tr>
        </table>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
        <h2 style={{ color: '#8B0000', fontSize: '20px', marginTop: 0 }}>Appointment Details</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Date:</td>
            <td style={{ padding: '10px 0', color: '#333', fontSize: '16px', fontWeight: 'bold' }}>{scheduledDate}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Time:</td>
            <td style={{ padding: '10px 0', color: '#333', fontSize: '16px', fontWeight: 'bold' }}>{scheduledTime}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Vehicle:</td>
            <td style={{ padding: '10px 0', color: '#333' }}>{vehicleInfo}</td>
          </tr>
          {selectedAddons.length > 0 && (
            <tr>
              <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Add-ons:</td>
              <td style={{ padding: '10px 0', color: '#333' }}>{selectedAddons.join(', ')}</td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '10px 0', color: '#666', fontWeight: 'bold' }}>Total:</td>
            <td style={{ padding: '10px 0', color: '#28a745', fontSize: '20px', fontWeight: 'bold' }}>
              ${totalPrice.toFixed(2)}
            </td>
          </tr>
        </table>
      </div>

      {notes && (
        <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
          <p style={{ margin: '0 0 10px 0', color: '#856404', fontWeight: 'bold' }}>Customer Notes:</p>
          <p style={{ margin: 0, color: '#856404' }}>{notes}</p>
        </div>
      )}

      <div style={{ backgroundColor: '#d1ecf1', border: '1px solid #17a2b8', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
        <p style={{ margin: 0, color: '#0c5460', fontSize: '14px' }}>
          <strong>Action Required:</strong> Contact the customer within 24 hours to confirm the appointment.
        </p>
      </div>
    </div>

    <div style={{ backgroundColor: '#333', color: '#999', padding: '20px', textAlign: 'center', fontSize: '12px' }}>
      <p style={{ margin: 0 }}>Colin's Coastal Car Care Admin Notification</p>
    </div>
  </div>
);

export default AdminNotificationEmail;

import nodemailer from 'nodemailer';
import { format } from 'date-fns';

// Create a transporter using the configured transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-password',
  },
});

// Email sender address
const FROM_EMAIL = process.env.EMAIL_FROM || 'KefaloniaBnb <your-email@gmail.com>';

/**
 * Formats a date for email display
 * @param date Date to format
 * @returns Formatted date string
 */
function formatDate(date: Date): string {
  return format(date, 'MMMM d, yyyy');
}

/**
 * Formats currency for display
 * @param amount Amount in cents
 * @returns Formatted currency string
 */
function formatCurrency(amount: number): string {
  return `€${(amount / 100).toFixed(2)}`;
}

/**
 * Sends a booking confirmation email to the guest
 * @param booking The booking details
 * @returns Success status
 */
export async function sendBookingConfirmation(booking: any): Promise<boolean> {
  // Mock function for now - implement with actual email sending later
  console.log('Sending booking confirmation email for:', booking);
  
  try {
    // Format dates for display
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    
    const mailOptions = {
      from: FROM_EMAIL,
      to: booking.email,
      subject: 'Your Kefalonia Vintage Home Booking Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://kefalonia-bnb.com/images/logokef1.png" alt="Kefalonia Vintage Home" style="max-width: 200px;">
            <h1 style="color: #2a609e;">Booking Confirmation</h1>
          </div>
          
          <p>Dear ${booking.name},</p>
          
          <p>Thank you for booking your stay at Kefalonia Vintage Home. We're excited to welcome you to our property!</p>
          
          <div style="background-color: #f7f7f7; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #2a609e; margin-top: 0;">Booking Details</h2>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Check-in:</td>
                <td>${formatDate(checkInDate)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Check-out:</td>
                <td>${formatDate(checkOutDate)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Guests:</td>
                <td>${booking.adults} adults, ${booking.children || 0} children</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Total Amount:</td>
                <td>${formatCurrency(booking.totalAmount)}</td>
              </tr>
            </table>
          </div>
          
          <h2 style="color: #2a609e;">What's Next?</h2>
          
          <ul style="padding-left: 20px;">
            <li>A few days before your arrival, we'll send you check-in instructions and directions.</li>
            <li>If you have any questions or need to make changes to your booking, please contact us.</li>
            <li>Don't forget to check our recommendations for local attractions and activities!</li>
          </ul>
          
          <p>We look forward to making your stay in Kefalonia memorable!</p>
          
          <p style="margin-top: 30px;">Warm regards,<br>The Kefalonia Vintage Home Team</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
            <p>If you have any questions, please contact us at <a href="mailto:info@kefalonia-bnb.com" style="color: #2a609e;">info@kefalonia-bnb.com</a> or call us at +30 694 455 7756.</p>
          </div>
        </div>
      `,
    };
    
    // Comment out actual email sending for testing
    // Just log success instead of actually sending
    // await transporter.sendMail(mailOptions);
    console.log('Email would be sent to:', booking.email);
    
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return false;
  }
}

/**
 * Sends a booking notification email to the property owner
 * @param booking The booking details
 * @returns Success status
 */
export async function sendOwnerNotification(booking: any): Promise<boolean> {
  // Mock function for now - implement with actual email sending later
  console.log('Sending owner notification email for:', booking);
  
  try {
    // Format dates for display
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    
    const mailOptions = {
      from: FROM_EMAIL,
      to: process.env.OWNER_EMAIL || 'owner@example.com',
      subject: 'New Booking: Kefalonia Vintage Home',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #2a609e;">New Booking Alert</h1>
          
          <p>A new booking has been confirmed for Kefalonia Vintage Home.</p>
          
          <div style="background-color: #f7f7f7; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #2a609e; margin-top: 0;">Booking Details</h2>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Guest Name:</td>
                <td>${booking.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td>${booking.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td>${booking.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Check-in:</td>
                <td>${formatDate(checkInDate)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Check-out:</td>
                <td>${formatDate(checkOutDate)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Guests:</td>
                <td>${booking.adults} adults, ${booking.children || 0} children</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Total Amount:</td>
                <td>${formatCurrency(booking.totalAmount)}</td>
              </tr>
              ${booking.specialRequests ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Special Requests:</td>
                <td>${booking.specialRequests}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <p>This booking has been added to your calendar.</p>
        </div>
      `,
    };
    
    // Comment out actual email sending for testing
    // Just log success instead of actually sending
    // await transporter.sendMail(mailOptions);
    console.log('Owner notification would be sent');
    
    return true;
  } catch (error) {
    console.error('Error sending owner notification email:', error);
    return false;
  }
}
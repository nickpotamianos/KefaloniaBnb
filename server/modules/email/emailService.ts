import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { Booking } from '@shared/schema';

// Create a transporter using the configured transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'nick.potamianos@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'vzvy urgn isjc khav',
  },
});

// Email sender address
const FROM_EMAIL = process.env.EMAIL_FROM || 'Kefalonia Vintage Home <nick.potamianos@gmail.com>';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'alexandros@potamianosgroup.com';
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'nick.potamianos@gmail.com';
const SUPPORT_PHONE = process.env.SUPPORT_PHONE || '+30 694 820 1383';

// Check email configuration on startup
(async () => {
  try {
    // Always verify in development to ensure credentials work
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Email service running in development mode - emails will still be sent for testing');
    }
  } catch (error) {
    console.error('Email configuration error:', error);
  }
})();

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
 * Sends an email using the configured transport
 * @param options Email options
 * @returns Promise resolving to success status
 */
async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  cc?: string;
  bcc?: string;
  attachments?: any[];
}): Promise<boolean> {
  try {
    // In development mode, log the email content but also send it
    if (process.env.NODE_ENV !== 'production') {
      console.log('====== EMAIL BEING SENT ======');
      console.log(`TO: ${options.to}`);
      console.log(`SUBJECT: ${options.subject}`);
      console.log(`CONTENT: ${options.html.substring(0, 200)}...`);
      console.log('==============================');
    }
    
    // Send the email in both development and production
    const mailOptions = {
      from: FROM_EMAIL,
      ...options
    };
    
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Sends a booking confirmation email to the guest
 * @param booking The booking details
 * @returns Success status
 */
export async function sendBookingConfirmation(booking: Booking): Promise<boolean> {
  try {
    // Format dates for display
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://villakefalonia.potamianosgroup.com/images/logokef1.png" alt="Kefalonia Vintage Home" style="max-width: 200px;">
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
          <p>If you have any questions, please contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: #2a609e;">${SUPPORT_EMAIL}</a> or call us at ${SUPPORT_PHONE}.</p>
        </div>
      </div>
    `;
    
    return await sendEmail({
      to: booking.email,
      subject: 'Your Kefalonia Vintage Home Booking Confirmation',
      html
    });
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
export async function sendOwnerNotification(booking: Booking): Promise<boolean> {
  try {
    // Format dates for display
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    
    const html = `
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
        
        <p>Please ensure the property is prepared for the guest's arrival on ${formatDate(checkInDate)}.</p>
        
        <p style="margin-top: 30px;">Regards,<br>Kefalonia Vintage Home Booking System</p>
      </div>
    `;
    
    return await sendEmail({
      to: OWNER_EMAIL,
      subject: 'New Booking: Kefalonia Vintage Home',
      html
    });
  } catch (error) {
    console.error('Error sending owner notification email:', error);
    return false;
  }
}

/**
 * Sends a pre-arrival email to the guest with check-in instructions
 * Typically sent 3 days before arrival
 * @param booking The booking details
 * @returns Success status
 */
export async function sendPreArrivalEmail(booking: Booking): Promise<boolean> {
  try {
    // Format dates for display
    const checkInDate = new Date(booking.checkIn);
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://villakefalonia.potamianosgroup.com/images/logokef1.png" alt="Kefalonia Vintage Home" style="max-width: 200px;">
          <h1 style="color: #2a609e;">Your Stay is Coming Soon!</h1>
        </div>
        
        <p>Dear ${booking.name},</p>
        
        <p>We're looking forward to welcoming you to Kefalonia Vintage Home in just a few days! Here's everything you need to know for a smooth arrival:</p>
        
        <div style="background-color: #f7f7f7; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2a609e; margin-top: 0;">Check-in Information</h2>
          <p><strong>Date:</strong> ${formatDate(checkInDate)}</p>
          <p><strong>Check-in time:</strong> 3:00 PM - 8:00 PM</p>
          <p><strong>Address:</strong> Kefalonia Vintage Home, Fiscardo, Kefalonia, Ionian Islands, Greece</p>
          
          <h3 style="color: #2a609e; margin-top: 20px;">Self Check-in Instructions</h3>
          <p>Our home offers convenient self-check-in with a lockbox. The code for your stay is: <strong>1234</strong></p>
          <p>You'll find the lockbox next to the main entrance. Please remember to lock the door and secure the key in the lockbox whenever you leave the property.</p>
        </div>
        
        <h2 style="color: #2a609e;">Getting to the Property</h2>
        <p>From Kefalonia Airport (EFL):</p>
        <ul>
          <li>The drive takes approximately 1 hour and 15 minutes.</li>
          <li>Follow signs to Fiscardo/Φισκάρδο (north of the island).</li>
          <li>Once in Fiscardo, follow our detailed directions (attached to this email).</li>
        </ul>
        
        <p>For turn-by-turn navigation, use this link: <a href="https://maps.app.goo.gl/5dfiX2VPvbXASHiC9" style="color: #2a609e;">Google Maps Location</a></p>
        
        <h2 style="color: #2a609e;">During Your Stay</h2>
        <ul>
          <li>WiFi Network: <strong>KefaloniaBnB</strong></li>
          <li>WiFi Password: <strong>welcome2kefalonia</strong></li>
          <li>The house manual with detailed instructions for all amenities will be available in the property.</li>
          <li>Alex is available at ${SUPPORT_PHONE} if you need any assistance.</li>
        </ul>
        
        <h2 style="color: #2a609e;">Local Recommendations</h2>
        <p>We've prepared a guide to our favorite local restaurants, beaches, and activities that you'll find in the house. For immediate reference, here are some highlights:</p>
        <ul>
          <li><strong>Restaurants:</strong> Tassia in Fiscardo, Odysseas in Agia Efimia, Nicolas Taverna in Madavinata</li>
          <li><strong>Beaches:</strong> Foki Beach (5 min drive), Emblisi Beach (10 min drive), Myrtos Beach (30 min drive)</li>
          <li><strong>Activities:</strong> Boat rental in Fiscardo Harbor, Melissani Cave tour, wine tasting at Robola Winery</li>
        </ul>
        
        <p>We're excited to host you and hope you have a wonderful stay!</p>
        
        <p style="margin-top: 30px;">Warm regards,<br>The Kefalonia Vintage Home Team</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
          <p>If you have any questions, please contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: #2a609e;">${SUPPORT_EMAIL}</a> or call us at ${SUPPORT_PHONE}.</p>
        </div>
      </div>
    `;
    
    // In a real implementation, you would include the directions PDF as an attachment
    
    return await sendEmail({
      to: booking.email,
      subject: 'Your Upcoming Stay at Kefalonia Vintage Home - Check-in Instructions',
      html
    });
  } catch (error) {
    console.error('Error sending pre-arrival email:', error);
    return false;
  }
}

/**
 * Sends a post-stay thank you email to the guest
 * Typically sent 1 day after checkout
 * @param booking The booking details
 * @returns Success status
 */
export async function sendPostStayEmail(booking: Booking): Promise<boolean> {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://villakefalonia.potamianosgroup.com/images/logokef1.png" alt="Kefalonia Vintage Home" style="max-width: 200px;">
          <h1 style="color: #2a609e;">Thank You for Staying With Us!</h1>
        </div>
        
        <p>Dear ${booking.name},</p>
        
        <p>Thank you for choosing Kefalonia Vintage Home for your recent stay in Kefalonia. We hope you had a wonderful time and created lasting memories on our beautiful island.</p>
        
        <p>We'd love to hear about your experience! Your feedback helps us improve and provide an even better stay for future guests.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.airbnb.com/rooms/936140466545331330" style="display: inline-block; background-color: #2a609e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Leave a Review</a>
        </div>
        
        <p>If you enjoyed your stay, we'd be honored if you'd share photos and memories on social media with the hashtag #KefaloniaVintageHome.</p>
        
        <div style="background-color: #f7f7f7; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2a609e; margin-top: 0;">Planning Another Visit?</h2>
          <p>We offer a 10% returning guest discount on future stays. Just mention this email when booking directly with us!</p>
          <p>The best times to visit Kefalonia are May-June and September-October when the weather is perfect and the island is less crowded.</p>
        </div>
        
        <p>We hope to welcome you back to Kefalonia Vintage Home soon!</p>
        
        <p style="margin-top: 30px;">Warm regards,<br>Alex and the Kefalonia Vintage Home Team</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
          <p>Follow us: 
            <a href="https://www.instagram.com/kefalonianvintagehome" style="color: #2a609e;">Instagram</a> | 
            <a href="https://www.facebook.com/kefalonianvintagehome" style="color: #2a609e;">Facebook</a>
          </p>
        </div>
      </div>
    `;
    
    return await sendEmail({
      to: booking.email,
      subject: 'Thank You for Staying at Kefalonia Vintage Home',
      html
    });
  } catch (error) {
    console.error('Error sending post-stay email:', error);
    return false;
  }
}

/**
 * Sends a cancellation email to the guest
 * @param booking The cancelled booking
 * @returns Success status
 */
export async function sendCancellationEmail(booking: Booking): Promise<boolean> {
  try {
    // Format dates for display
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://villakefalonia.potamianosgroup.com/images/logokef1.png" alt="Kefalonia Vintage Home" style="max-width: 200px;">
          <h1 style="color: #2a609e;">Booking Cancellation Confirmation</h1>
        </div>
        
        <p>Dear ${booking.name},</p>
        
        <p>We're confirming that your booking at Kefalonia Vintage Home has been cancelled as requested.</p>
        
        <div style="background-color: #f7f7f7; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2a609e; margin-top: 0;">Cancelled Booking Details</h2>
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
          </table>
        </div>
        
        <p>If your plans change and you'd like to stay with us in the future, we'll be happy to welcome you to Kefalonia Vintage Home.</p>
        
        <p style="margin-top: 30px;">Warm regards,<br>The Kefalonia Vintage Home Team</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
          <p>If you have any questions, please contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: #2a609e;">${SUPPORT_EMAIL}</a> or call us at ${SUPPORT_PHONE}.</p>
        </div>
      </div>
    `;
    
    return await sendEmail({
      to: booking.email,
      subject: 'Your Kefalonia Vintage Home Booking Cancellation',
      html
    });
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    return false;
  }
}

/**
 * Sends a test email to verify the email configuration
 * @param recipient Email address to send the test to
 * @returns Success status
 */
export async function sendTestEmail(recipient: string): Promise<boolean> {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://villakefalonia.potamianosgroup.com/images/logokef1.png" alt="Kefalonia Vintage Home" style="max-width: 200px;">
          <h1 style="color: #2a609e;">Email System Test</h1>
        </div>
        
        <p>This is a test email from the Kefalonia Vintage Home booking system.</p>
        
        <p>If you're receiving this, the email system is configured correctly!</p>
        
        <div style="background-color: #f7f7f7; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2a609e; margin-top: 0;">Email Configuration Details</h2>
          <table style="width: 100%;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">SMTP Host:</td>
              <td>${process.env.EMAIL_HOST || 'smtp.gmail.com'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Sender Email:</td>
              <td>${FROM_EMAIL}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Test Timestamp:</td>
              <td>${new Date().toISOString()}</td>
            </tr>
          </table>
        </div>
        
        <p style="margin-top: 30px;">Regards,<br>Kefalonia Vintage Home Booking System</p>
      </div>
    `;
    
    return await sendEmail({
      to: recipient,
      subject: 'Kefalonia Vintage Home - Email System Test',
      html
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return false;
  }
}
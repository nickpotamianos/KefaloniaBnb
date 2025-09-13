# KefaloniaBnb - Villa Fiscardo Booking Platform (https://villafiscardo.com/)

A modern, full-stack vacation rental booking website for a luxury villa in Fiscardo, Kefalonia, Greece. This comprehensive platform features real-time booking capabilities, payment processing, SEO optimization, and content management.

## 🏖️ Project Overview

KefaloniaBnb is a sophisticated vacation rental platform built specifically for Villa Fiscardo. The application provides guests with an intuitive booking experience while offering property owners powerful administrative tools and automated SEO management.

### Key Features

- **Real-time Booking System** - Interactive calendar with availability checking
- **Payment Processing** - Stripe integration for secure transactions
- **SEO Automation** - Advanced SEO tools with Google Search Console integration
- **Content Management** - Blog system with dynamic content generation
- **Admin Dashboard** - Comprehensive property and booking management
- **Responsive Design** - Mobile-first approach with modern UI/UX
- **Multi-language Support** - Built for international guests
- **Analytics Integration** - Performance tracking and monitoring

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library built on Radix UI
- **Framer Motion** - Smooth animations and transitions
- **Wouter** - Lightweight client-side routing
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form handling with validation
- **React Helmet Async** - SEO meta tag management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **Drizzle ORM** - Type-safe database operations
- **Neon Database** - Serverless PostgreSQL
- **Stripe** - Payment processing
- **Google APIs** - Search Console and indexing automation
- **Nodemailer** - Email notifications

### Database & Storage
- **PostgreSQL (Neon)** - Primary database
- **MongoDB** - Additional data storage
- **Session Management** - Express sessions with PostgreSQL store

### SEO & Analytics
- **Google Search Console API** - Automated URL submission
- **Google Indexing API** - Accelerated content indexing
- **Sitemap Generation** - Dynamic sitemap creation
- **Canonical URL Management** - SEO-friendly URL structure
- **Schema.org Markup** - Rich snippets for search engines

### Development & Deployment
- **GitHub Actions** - CI/CD pipeline
- **Digital Ocean** - Production hosting
- **Nginx** - Web server and reverse proxy
- **ESBuild** - Fast JavaScript bundling
- **Drizzle Kit** - Database migrations and management

## 📁 Project Structure

```
KefaloniaBnb/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
│   └── public/            # Static assets and SEO files
├── server/                # Backend Express API
│   ├── modules/           # Feature-based modules
│   │   ├── calendar/      # Booking calendar logic
│   │   ├── database/      # Database configurations
│   │   ├── email/         # Email service
│   │   ├── payment/       # Stripe integration
│   │   └── seo/           # SEO automation tools
│   └── middleware/        # Express middleware
├── scripts/               # SEO and automation scripts
├── shared/                # Shared types and schemas
└── nginx.conf            # Production server configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon recommended)
- Stripe account for payments
- Google Cloud Console project for SEO APIs

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/KefaloniaBnb.git
   cd KefaloniaBnb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   npm run setup
   ```
   This interactive script will guide you through creating a `.env` file with all necessary configurations.

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🎯 Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking

### Database
- `npm run db:push` - Push database schema changes

### SEO Automation
- `npm run seo:preflight` - Pre-deployment SEO checks
- `npm run seo:submit` - Submit URLs to search engines
- `npm run seo:monitor` - Monitor SEO health
- `npm run seo:accelerate` - Accelerated indexing process
- `npm run seo:track` - Track keyword performance
- `npm run seo:content` - Generate villa content
- `npm run seo:verify` - Final SEO verification

### Scheduled Tasks
- `npm run seo:daily` - Daily SEO automation
- `npm run seo:weekly` - Weekly SEO tasks
- `npm run seo:monthly` - Monthly SEO analysis

## 🏗️ Core Features

### Booking System
- Real-time availability calendar using React Day Picker
- Dynamic pricing based on season and duration
- Instant booking confirmation
- Email notifications for guests and property owners

### Payment Processing
- Secure Stripe integration
- Multiple payment methods support
- Automatic invoice generation
- Refund management

### SEO Automation
- Automated Google Search Console submissions
- Dynamic sitemap generation
- Canonical URL management
- Performance monitoring and reporting
- Keyword tracking and optimization

### Admin Dashboard
- Booking management and calendar overview
- Pricing controls and seasonal adjustments
- Guest communication tools
- Analytics and reporting

### Content Management
- Dynamic blog system with SEO optimization
- Villa showcase with interactive galleries
- Local area guides and recommendations
- Multi-language content support

## 🌐 Deployment

The project uses GitHub Actions for automated deployment to Digital Ocean:

1. Code changes trigger the CI/CD pipeline
2. Automated testing and building
3. Environment-specific deployments
4. SEO automation post-deployment

### Environment Variables

Key environment variables needed:
- `STRIPE_SECRET_KEY` - Stripe payment processing
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_CLIENT_EMAIL` - Google APIs authentication
- `EMAIL_USER` / `EMAIL_PASS` - Email service credentials

## 📊 SEO Features

This project includes advanced SEO automation:

- **Automated Indexing** - Submits new content to Google within minutes
- **Performance Monitoring** - Tracks search rankings and traffic
- **Content Optimization** - Generates SEO-friendly content automatically
- **Technical SEO** - Handles canonical URLs, sitemaps, and meta tags
- **Reporting** - Comprehensive SEO health reports

## 🔒 Security

- Environment variables for sensitive data
- Secure session management
- CORS protection
- Input validation and sanitization
- Rate limiting for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏛️ About Villa Fiscardo

Villa Fiscardo is a luxury vacation rental located in the picturesque village of Fiscardo, Kefalonia. This booking platform showcases the property and provides guests with a seamless reservation experience while highlighting the natural beauty and attractions of the Greek islands.

---

**Built with ❤️ for the beautiful island of Kefalonia, Greece**

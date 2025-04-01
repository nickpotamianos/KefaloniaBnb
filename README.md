# KefaloniaBnb Booking Website

A vacation rental booking website for a property in Kefalonia, Greece, featuring online booking capabilities with Stripe payment integration.

## Getting Started

This guide will help you set up the project on your local machine for development.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Stripe account (for payment processing)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/KefaloniaBnb.git
   cd KefaloniaBnb
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   npm run setup
   ```
   This interactive script will help you create a `.env` file with necessary configuration.
   
   You'll need:
   - Stripe test API keys (get these from your Stripe dashboard)
   - Email service credentials (if you want to test email functionality)

4. Start the development server
   ```bash
   npm run dev
   ```

### Environment Setup

The project uses environment variables for configuration. These are not committed to the repository for security reasons.

- For local development: Use the setup script to create your `.env` file
- For production: Environment variables are managed through GitHub Secrets and deployed securely

## Deployment

This project uses GitHub Actions for continuous deployment:

1. When code is pushed to the main branch, it triggers the deployment workflow
2. The workflow builds the application with the appropriate environment variables
3. Different environments (development, production) use different sets of secrets

## Security

This project follows security best practices:

- All sensitive keys (Stripe API keys, email credentials) are stored as GitHub Secrets
- Never committed to the repository
- Only accessible during deployment through secure environment variables
- Different keys are used for development and production environments

## Project Structure

- `client/` - Frontend React application
- `server/` - Backend Express API
- `shared/` - Shared types and utilities
- `scripts/` - Utility scripts

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# Raza Traders - Billing & Inventory Management System

A comprehensive billing and inventory management system built with Next.js 16, Prisma, and SQLite.

## Features

- 📦 Inventory Management
- 💰 Billing System
- 👥 Customer Management
- 📊 Reports & Analytics
- ⚠️ Low Stock Alerts
- 🚀 Fast & Responsive UI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
The `.env` file is already configured. For production, see deployment section.

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Production Deployment

### Quick Deploy (Windows)
```bash
start.bat
```

### Quick Deploy (Linux/Mac)
```bash
chmod +x start.sh
./start.sh
```

### Manual Deployment

```bash
npm install
npx prisma generate
npx prisma db push --accept-data-loss
npm run build
npm start
```

### Environment Variables for Production

Make sure to set these in your hosting platform:

```
DATABASE_URL="file:./prisma/dev.db"
SHADOW_DATABASE_URL="file:./prisma/shadow.db"
```

### Recommended Hosting Platforms

**For SQLite:**
- Railway.app
- Render.com
- Your own VPS/server

**For PostgreSQL (requires schema change):**
- Vercel
- Netlify
- AWS/Azure/GCP

⚠️ **Important**: This app uses SQLite. If deploying to Vercel/Netlify, you'll need to switch to PostgreSQL. See `DEPLOYMENT.md` for details.

## Project Structure

```
raza-traders/
├── prisma/          # Database schema and files
├── src/
│   ├── app/        # Next.js app router pages and API routes
│   ├── components/ # React components
│   └── lib/        # Utilities and configurations
├── public/         # Static assets
└── .env            # Environment variables
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS v4
- **UI Components**: Lucide Icons, Framer Motion
- **Charts**: Recharts
- **PDF Generation**: jsPDF

## Learn More

Check out `DEPLOYMENT.md` for detailed deployment instructions and database configuration options.

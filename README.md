# ILMS - Integrated Lands Management System

> **Enterprise Resource Planning (ERP) System for Papua New Guinea's Department of Lands & Physical Planning**

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Built with Same](https://img.shields.io/badge/Built%20with-Same-blue)](https://same.new)

A comprehensive, modern web-based ERP system unifying all land management operations across DLPP divisions into a single, integrated platform.

## ✨ Key Features

- 🎯 **Executive Dashboard** - Real-time KPIs and cross-divisional analytics
- 🏢 **8 Operational Modules** - Physical Planning, State Lands, Survey, Audit, Cases, Valuation, ILG, Customary Lands
- 🔍 **Advanced Search & Filter** - Powerful data tables with search, filter, and sort
- 📊 **Live Data Integration** - Real-time Supabase database connectivity
- 🎨 **Professional UI** - Green gradient design with DLPP branding
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔗 **Legacy Integration** - Iframe integration with existing Netlify applications
- 🔐 **Role-Based Access** - Secure authentication with division-specific permissions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh) runtime
- Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/emabi2002/ilms.git
cd ilms

# Install dependencies
bun install  # or npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
bun run dev  # or npm run dev
```

Visit http://localhost:3000

### Database Setup

1. Go to http://localhost:3000/setup
2. Copy the SQL schema
3. Run it in your [Supabase SQL Editor](https://supabase.com/dashboard)
4. Return to the dashboard

**For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

## 📊 Features

### Operational Modules
- ✅ **Executive Dashboard** - KPIs and analytics
- ✅ **Physical Planning** - Development applications
- ✅ **State Lands** - Lease management
- ✅ **Survey & Mapping** - Survey plans
- ✅ **Land Audit** - Compliance tracking
- ✅ **Cases** - Legal cases and litigation
- ✅ **Valuation** - Property valuations
- ✅ **ILG** - Incorporated Land Groups
- ✅ **Customary Lands** - Traditional agreements
- ✅ **Calendar** - Integrated events
- ✅ **Administration** - System settings

### Integration with Legacy Systems
- Physical Planning: https://physicalplanning.netlify.app/dashboard
- State Lands: https://statelandsystem.netlify.app/
- Survey: https://landsurveysystem.netlify.app/dashboard
- Audit: https://landauditsystem.netlify.app/dashboard
- Cases: https://landcasesystem.netlify.app/dashboard

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: Bun

## 📸 Screenshots

### Executive Dashboard
![Executive Dashboard](https://via.placeholder.com/1200x600/10b981/ffffff?text=Executive+Dashboard+with+Real-time+KPIs)

*Real-time dashboard showing KPIs across all divisions with live Supabase data*

### Data Tables with Search & Filter
![Data Table](https://via.placeholder.com/1200x600/059669/ffffff?text=Advanced+Data+Tables+with+Search+%26+Filter)

*Powerful search, filter, and sort capabilities on all module data tables*

### Professional Design
![Green Gradient Header](https://via.placeholder.com/1200x200/10b981/ffffff?text=DLPP+Branded+Green+Gradient+Header)

*Professional PNG government branding with DLPP logo and green gradient theme*

## 📁 Project Structure

```
ilms/
├── src/
│   ├── app/              # Pages and routes
│   │   ├── dashboard/    # Executive dashboard
│   │   ├── physical-planning/
│   │   ├── state-lands/
│   │   ├── surveys/
│   │   ├── audit/
│   │   ├── cases/
│   │   ├── valuation/
│   │   ├── ilg/
│   │   ├── customary-lands/
│   │   ├── calendar/
│   │   ├── admin/
│   │   ├── setup/        # Database setup page
│   │   └── auth/
│   ├── components/       # Reusable components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── KpiCard.tsx
│   │   └── ...
│   ├── lib/             # Utilities
│   │   ├── supabaseClient.ts
│   │   └── utils.ts
│   └── types/           # TypeScript definitions
│       └── index.ts
├── .env.local           # Environment variables (configured)
└── ILMS_SETUP_GUIDE.md  # Complete documentation
```

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control
- Division-specific data filtering
- Secure API routes

## 📞 Support

For detailed documentation, see `ILMS_SETUP_GUIDE.md`

## 📄 License

© 2025 Department of Lands & Physical Planning, Papua New Guinea
Internal use only. All rights reserved.

## 📚 Documentation

- **[Deployment Guide](DEPLOYMENT.md)** - Complete deployment instructions for all platforms
- **[Setup Guide](ILMS_SETUP_GUIDE.md)** - Detailed system setup and configuration  
- **[Database Schema](src/app/setup/page.tsx)** - SQL schema for database initialization

## 🔧 Development Commands

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
```

## 🌐 Deployment

Deploy to your preferred platform:

- **Netlify:** Use included `netlify.toml` configuration
- **Vercel:** Import from GitHub with one click
- **Self-hosted:** See [DEPLOYMENT.md](DEPLOYMENT.md) for VPS setup

## 🐛 Troubleshooting

**Database shows 0 records:**
- Visit `/setup` and run the SQL schema
- Verify Supabase credentials in `.env.local`

**Build errors:**
```bash
rm -rf .next node_modules && bun install && bun run build
```

See [DEPLOYMENT.md](DEPLOYMENT.md#troubleshooting) for more solutions.

## 🎯 Roadmap

- [ ] Implement Supabase Auth for user login
- [ ] Add data entry forms for all modules  
- [ ] Export to Excel/PDF functionality
- [ ] Advanced analytics with charts
- [ ] GIS/mapping integration
- [ ] Mobile app (iOS/Android)

## 👏 Acknowledgments

Built with [Same](https://same.new) - AI-powered development platform

---

**© 2025 Department of Lands & Physical Planning, Papua New Guinea**  
This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

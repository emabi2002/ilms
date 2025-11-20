# ILMS - Integrated Lands Management System

> **ERP System for PNG Department of Lands & Physical Planning**

## 🎯 Quick Start

### 1. Supabase is Already Connected! ✅

Your Supabase credentials have been configured:
- **Project URL**: https://yvnkyjnwvylrweyzvibs.supabase.co
- **Status**: Connected and ready

### 2. Set Up Your Database

**Option A: Use the Setup Page (Recommended)**
1. Navigate to http://localhost:3000/setup
2. Click "Copy SQL Schema to Clipboard"
3. Open [Supabase SQL Editor](https://supabase.com/dashboard/project/yvnkyjnwvylrweyzvibs/sql/new)
4. Paste and run the SQL
5. Return to the [ILMS Dashboard](http://localhost:3000/dashboard)

**Option B: Manual Setup**
Run the SQL from `ILMS_SETUP_GUIDE.md` in your Supabase SQL Editor.

### 3. Start Using ILMS

The system is already running at http://localhost:3000

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

## 📁 Project Structure

```
ilms-erp/
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

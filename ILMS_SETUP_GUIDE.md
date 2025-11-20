# ILMS - Integrated Lands Management System
## Setup and User Guide

### Overview
The Integrated Lands Management System (ILMS) is a comprehensive ERP platform for Papua New Guinea's Department of Lands & Physical Planning (DLPP). It unifies all land management operations into a single, modern web application.

---

## 🎯 System Features

### Core Modules
1. **Executive Dashboard** - High-level KPIs and cross-divisional analytics
2. **Physical Planning** - Development applications, zoning, approvals
3. **State Lands** - Lease management, renewals, rent arrears tracking
4. **Survey & Mapping** - Survey plans, surveyors, parcel coordinates
5. **Land Audit & Compliance** - Audit tracking, risk assessment, compliance
6. **Land Cases & Litigation** - Court cases, hearings, legal tracking
7. **Valuation** - Property valuations, valuation rolls, market rates
8. **ILG (Incorporated Land Groups)** - ILG registration, membership, disputes
9. **Customary Lands** - Traditional agreements, conversions to state lease
10. **Calendar** - Integrated events across all divisions
11. **Administration** - User management, reference data, system settings

### Integration with Legacy Systems
- Links to existing Netlify applications via iframe
- Gradual migration path from legacy to unified system
- Maintains data consistency with shared Supabase backend

---

## 🚀 Getting Started

### Prerequisites
- Bun v1.2+ (or Node.js v18+)
- Supabase account and project
- Access to DLPP network (for production deployment)

### Installation

1. **Clone the repository** (if using version control)
```bash
git clone <repository-url>
cd ilms-erp
```

2. **Install dependencies**
```bash
bun install
```

3. **Configure Environment Variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. **Run Development Server**
```bash
bun run dev
```

Access at: `http://localhost:3000`

---

## 🗄️ Database Setup

### Supabase Schema
The system expects the following core tables in Supabase:

#### Core Entities
- `parcels` - Land parcel records
- `leases` - State land leases
- `cases` - Legal cases and litigation
- `survey_plans` - Survey documents and plans
- `valuations` - Property valuations
- `ilg` - Incorporated Land Group registrations
- `customary_agreements` - Customary land agreements
- `development_applications` - Planning applications
- `audit_records` - Audit and compliance records
- `users` - System users
- `events` - Calendar events

#### Security
- Row Level Security (RLS) policies implemented
- Role-based access control
- Division-specific data filtering

---

## 👥 User Roles & Permissions

### Executive Roles
- **Secretary** - Full system access, all divisions
- **Deputy Secretary** - Full access with reporting capabilities

### Division Directors
- **Director Physical Planning** - Full access to Physical Planning module
- **Director State Lands** - Full access to State Lands module
- **Director Survey** - Full access to Survey & Mapping module
- **Director Audit** - Full access to Audit & Compliance module
- **Director Cases** - Full access to Cases & Litigation module
- **Director Valuation** - Full access to Valuation module

### Officers
- **Officer (Division-specific)** - Module access based on assigned division
- **Provincial Officer** - Regional access with limited permissions

---

## 📊 Module Details

### 1. Executive Dashboard
**Purpose:** High-level overview for decision-makers

**Features:**
- KPI cards for each division
- Open cases summary by division
- Recent activities across all modules
- Trend indicators (month-over-month comparisons)

**Access:** Secretary, Deputy Secretary

---

### 2. Physical Planning
**Purpose:** Manage development applications and zoning

**Features:**
- Application intake and tracking
- Zoning management
- Approval workflows
- Planning board meeting records

**Legacy Integration:** https://physicalplanning.netlify.app/dashboard

---

### 3. State Lands
**Purpose:** Manage state land leases and rentals

**Features:**
- Lease creation and renewals
- Ground rent tracking
- Arrears management
- Revenue collection monitoring

**Legacy Integration:** https://statelandsystem.netlify.app/

---

### 4. Survey & Mapping
**Purpose:** Manage survey plans and surveyor licensing

**Features:**
- Survey plan lodgement
- Plan approval workflow
- Surveyor registration
- Coordinates and beacon tracking

**Legacy Integration:** https://landsurveysystem.netlify.app/dashboard

---

### 5. Land Audit & Compliance
**Purpose:** Track compliance and audit findings

**Features:**
- Audit scheduling
- Risk assessment (Low, Medium, High, Critical)
- Non-compliance tracking
- Remediation recommendations

**Legacy Integration:** https://landauditsystem.netlify.app/dashboard

---

### 6. Land Cases & Litigation
**Purpose:** Manage legal cases and court proceedings

**Features:**
- Case intake (Civil, Criminal, Administrative)
- Court hearing schedule
- Document management
- Outcome tracking

**Legacy Integration:** https://landcasesystem.netlify.app/dashboard

---

### 7. Valuation
**Purpose:** Property valuations and valuation rolls

**Features:**
- Market valuations
- Rental valuations
- Improvement valuations
- Valuation roll maintenance
- Historical valuation records

**Note:** Primary system (no legacy integration)

---

### 8. ILG (Incorporated Land Groups)
**Purpose:** ILG registration and management

**Features:**
- ILG registration
- Membership tracking
- Leadership records
- Constitution management
- Dispute resolution

**Note:** Primary system (no legacy integration)

---

### 9. Customary Lands
**Purpose:** Customary land agreements and conversions

**Features:**
- Customary agreement registration
- Clan/ILG linkage
- Boundary records
- Conversion to state lease pipeline
- Dispute mediation

**Note:** Primary system (no legacy integration)

---

### 10. Integrated Calendar
**Purpose:** Unified event tracking across divisions

**Features:**
- Court dates from Cases
- Lease expiry dates from State Lands
- Survey deadlines
- Planning board meetings
- Audit schedules
- Division filtering

---

### 11. Administration
**Purpose:** System configuration and user management

**Sub-modules:**
- **User & Role Management** - Create users, assign roles, manage permissions
- **Reference Data** - Provinces, districts, LLGs, classifications
- **System Settings** - Email config, notifications, defaults
- **Security & Audit Logs** - Access logs, security events
- **Reports Configuration** - Report templates, scheduling

---

## 🎨 Design System

### Colors
- **Primary (Blue)** - #2563eb - Actions, active states
- **Success (Green)** - #16a34a - Approvals, positive trends
- **Warning (Yellow)** - #ca8a04 - Pending, medium risk
- **Danger (Red)** - #dc2626 - Critical, rejected, high risk
- **Neutral (Zinc)** - #71717a - Text, borders, backgrounds

### Typography
- **Font Family** - Geist Sans (system font fallback)
- **Headings** - Bold, tight line-height
- **Body** - Regular, comfortable reading size
- **Data Tables** - Monospace for reference numbers

### Components
- Based on shadcn/ui component library
- Consistent spacing and sizing
- Accessible (WCAG 2.1 compliant)

---

## 📱 Mobile Responsiveness

### Breakpoints
- **Mobile** - < 768px (collapsible sidebar, stacked cards)
- **Tablet** - 768px - 1024px (optimized layouts)
- **Desktop** - > 1024px (full sidebar, multi-column layouts)

### Mobile Menu
- Hamburger menu button (top-left)
- Slide-out sidebar with overlay
- Auto-close on navigation
- Touch-friendly targets

---

## 🔐 Security Best Practices

### Authentication
1. Always use environment variables for sensitive data
2. Implement Supabase Auth for user authentication
3. Use JWT tokens for API requests
4. Enforce session timeouts

### Data Access
1. Enable Row Level Security (RLS) on all tables
2. Implement division-based data filtering
3. Audit all data modifications
4. Encrypt sensitive data at rest

### Network Security
1. Use HTTPS in production
2. Implement rate limiting
3. Enable CORS restrictions
4. Regular security audits

---

## 🚢 Deployment

### Development
```bash
bun run dev
```

### Production Build
```bash
bun run build
bun run start
```

### Netlify Deployment
The project includes a `netlify.toml` configuration for easy deployment to Netlify with serverless functions support.

### Environment Setup
Ensure all environment variables are configured in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🔧 Customization

### Adding New Modules
1. Create page in `src/app/[module-name]/page.tsx`
2. Add route to sidebar in `src/components/Sidebar.tsx`
3. Create module-specific types in `src/types/index.ts`
4. Add database tables and RLS policies
5. Test thoroughly

### Modifying Existing Modules
1. All module pages follow the `ModulePage` component pattern
2. Use the `Overview`, `Worklist`, `Analytics`, `Legacy System` tabs structure
3. Maintain consistent styling with existing modules

---

## 📞 Support

### For Issues
- Check documentation first
- Review Supabase logs for backend issues
- Check browser console for frontend errors
- Contact ILMS administrator for access issues

### For Feature Requests
- Document the business case
- Get approval from division director
- Submit to development team

---

## 📄 License
© 2025 Department of Lands & Physical Planning, Papua New Guinea
Internal use only. All rights reserved.

---

## 🎯 Future Roadmap

### Phase 2 Enhancements
- [ ] Real-time notifications
- [ ] Advanced reporting and exports
- [ ] GIS integration for mapping
- [ ] Mobile app (iOS/Android)
- [ ] Document management system
- [ ] Workflow automation
- [ ] Inter-agency data sharing
- [ ] Public portal for land information

### Data Migration
- [ ] Migrate legacy data to unified schema
- [ ] Data validation and cleanup
- [ ] Historical data preservation
- [ ] Training and change management

# ILMS Deployment Guide

Complete guide for deploying the Integrated Lands Management System from GitHub.

## 📋 Prerequisites

- Node.js 18+ or Bun runtime
- Git installed
- Supabase account (free tier works)
- GitHub account

## 🚀 Quick Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/emabi2002/ilms.git
cd ilms
```

### 2. Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Or using npm:
```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://yvnkyjnwvylrweyzvibs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Where to find these values:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Set Up Database

#### Option A: Using the Setup Page (Recommended)

1. Start the development server:
   ```bash
   bun run dev
   ```

2. Visit http://localhost:3000/setup

3. Click "Copy SQL Schema to Clipboard"

4. Open your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql/new)

5. Paste and run the SQL

6. Return to http://localhost:3000/dashboard

#### Option B: Manual SQL Execution

1. Copy the SQL schema from `ILMS_SETUP_GUIDE.md` (search for "Database Schema Setup")

2. Run it in your Supabase SQL Editor

### 5. Start the Application

Development mode:
```bash
bun run dev
```

Production build:
```bash
bun run build
bun run start
```

The application will be available at http://localhost:3000

## 🌐 Deployment to Production

### Option 1: Deploy to Netlify

The project includes a `netlify.toml` configuration file.

1. **Connect Repository:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and choose `emabi2002/ilms`

2. **Configure Build Settings:**
   - Build command: `bun run build` (or `npm run build`)
   - Publish directory: `.next`

3. **Add Environment Variables:**
   Go to Site settings → Environment variables and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ```

4. **Deploy:**
   Click "Deploy site"

### Option 2: Deploy to Vercel

1. **Import Project:**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New" → "Project"
   - Import `emabi2002/ilms` from GitHub

2. **Configure:**
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `bun run build` (or leave default)
   - Output Directory: `.next` (default)

3. **Environment Variables:**
   Add the same variables as Netlify

4. **Deploy:**
   Click "Deploy"

### Option 3: Self-Hosted (VPS/Cloud Server)

Requirements:
- Ubuntu 22.04 LTS or similar
- Node.js 18+ or Bun
- Nginx (recommended)
- SSL certificate (Let's Encrypt)

**Setup Steps:**

1. **Clone and Build:**
   ```bash
   git clone https://github.com/emabi2002/ilms.git
   cd ilms
   bun install
   bun run build
   ```

2. **Set Environment Variables:**
   ```bash
   nano .env.local
   # Add your Supabase credentials
   ```

3. **Install PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   ```

4. **Start Application:**
   ```bash
   pm2 start "bun run start" --name ilms
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Set Up SSL:**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## 🔧 Post-Deployment Configuration

### 1. Database Initialization

Visit `/setup` on your deployed URL and run the SQL schema if you haven't already.

### 2. User Management

1. Go to `/admin/users`
2. Create user accounts for your team
3. Assign appropriate roles:
   - Secretary
   - Deputy Secretary
   - Director (division-specific)
   - Officer (division-specific)

### 3. Reference Data

1. Go to `/admin/reference-data`
2. Verify provinces are populated (22 PNG provinces)
3. Add additional reference data:
   - Districts
   - LLGs
   - Land classifications
   - Case categories
   - Zoning types

### 4. Integration with Legacy Systems

The following modules link to existing systems:
- Physical Planning: https://physicalplanning.netlify.app/dashboard
- State Lands: https://statelandsystem.netlify.app/
- Survey: https://landsurveysystem.netlify.app/dashboard
- Audit: https://landauditsystem.netlify.app/dashboard
- Cases: https://landcasesystem.netlify.app/dashboard

These iframes will work automatically in the "Legacy System" tab of each module.

## 📊 Monitoring & Maintenance

### Health Checks

Monitor these endpoints:
- **Application:** `https://your-domain.com/dashboard`
- **API:** `https://your-domain.com/api/test-connection`

### Database Backups

Supabase provides automatic backups, but for critical data:

1. Go to Supabase Dashboard → Database → Backups
2. Enable Point-in-Time Recovery (paid plan)
3. Or manually export data periodically

### Updates

To update your deployment:

```bash
cd ilms
git pull origin main
bun install
bun run build
pm2 restart ilms  # If using PM2
```

## 🔐 Security Checklist

- [ ] Environment variables are set correctly
- [ ] `.env.local` is not in version control
- [ ] Supabase RLS policies are enabled
- [ ] SSL/TLS certificate is active
- [ ] Database backups are configured
- [ ] Only authorized users have admin access
- [ ] Service role key is kept secret (server-side only)

## 🐛 Troubleshooting

### Database Connection Issues

**Problem:** Dashboard shows "Loading..." or 0 values

**Solutions:**
1. Verify Supabase credentials in `.env.local`
2. Check Supabase project is not paused (free tier pauses after 7 days inactivity)
3. Visit `/setup` and run the SQL schema
4. Check browser console for errors

### Build Errors

**Problem:** Build fails with TypeScript errors

**Solutions:**
1. Delete `.next` folder and `node_modules`
2. Reinstall dependencies: `bun install`
3. Try building again: `bun run build`

### Port Already in Use

**Problem:** Port 3000 is already in use

**Solutions:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 bun run dev
```

## 📞 Support

For issues or questions:
- GitHub Issues: https://github.com/emabi2002/ilms/issues
- Documentation: See `ILMS_SETUP_GUIDE.md`
- Email: support@dlpp.gov.pg (production)

## 📝 License

© 2025 Department of Lands & Physical Planning, Papua New Guinea
Internal use only. All rights reserved.

# Deploying ILMS to Netlify

## Quick Fix for 404 Errors

The latest code push (commit `c0366e0`) fixes the Netlify configuration. Follow these steps:

### Step 1: Trigger a New Deploy

In your Netlify dashboard:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Or wait for automatic deployment from the latest GitHub commit

### Step 2: Verify Build Settings

Go to **Site configuration** → **Build & deploy** → **Build settings**

Ensure these settings:

**Build command:**
```
npm install && npm run build
```

**Publish directory:**
```
Leave empty or delete the value
```
(The @netlify/plugin-nextjs handles this automatically)

### Step 3: Environment Variables

Go to **Site configuration** → **Environment variables**

Add these variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://yvnkyjnwvylrweyzvibs.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |

**Important:** After adding environment variables, you MUST redeploy:
- Click **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### Step 4: Check Node Version (Optional)

If the build fails, set the Node version:

1. Go to **Site configuration** → **Environment variables**
2. Add:
   - Key: `NODE_VERSION`
   - Value: `18` or `20`

### Step 5: Enable Next.js Plugin

The `netlify.toml` file already includes:
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Netlify should automatically detect and use this.

## What Was Fixed

### Previous Issues:
❌ `NETLIFY_NEXT_PLUGIN_SKIP = "true"` was disabling the Next.js plugin
❌ Incorrect publish directory (`.next`)
❌ Missing proper routing configuration

### Current Configuration:
✅ Next.js plugin enabled
✅ Automatic routing handled by plugin
✅ Proper build command with dependency installation
✅ Server-side rendering and API routes supported

## Expected Build Output

A successful build should show:
```
Building Next.js application...
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (15/15)
✓ Collecting build traces
✓ Finalizing page optimization

Site is live ✨
```

## Testing Your Deployment

After successful deployment, test these URLs:

1. **Homepage:** `https://your-site.netlify.app/`
   - Should redirect to `/dashboard`

2. **Dashboard:** `https://your-site.netlify.app/dashboard`
   - Should show Executive Dashboard with KPIs

3. **State Lands:** `https://your-site.netlify.app/state-lands`
   - Should show State Lands module

4. **Setup Page:** `https://your-site.netlify.app/setup`
   - Should show database setup instructions

## Troubleshooting

### Still Getting 404?

**Check deploy logs:**
1. Go to **Deploys** tab
2. Click on the latest deploy
3. Scroll through the logs
4. Look for errors in the build output

**Common issues:**

**Build fails with TypeScript errors:**
- Make sure you're deploying from the latest commit
- Check that all environment variables are set

**Build succeeds but site shows 404:**
- Verify the Next.js plugin is active (check deploy logs for "@netlify/plugin-nextjs")
- Clear cache and redeploy
- Check that you're not setting a custom publish directory

**Environment variables not working:**
- After adding/changing variables, trigger "Clear cache and deploy site"
- Don't use quotes around the values in Netlify dashboard

### Build Command Alternative

If npm has issues, try using Netlify's built-in commands:

**Build command:**
```
npm ci && npm run build
```

(`npm ci` is faster and more reliable in CI environments)

## Netlify Functions (API Routes)

Next.js API routes in `/src/app/api/*` will automatically become Netlify Functions.

Example:
- `/src/app/api/test-connection/route.ts` → `https://your-site.netlify.app/api/test-connection`

## Custom Domain

To add a custom domain:

1. Go to **Domain management** → **Add a domain**
2. Follow Netlify's instructions to:
   - Add a custom domain
   - Configure DNS
   - Enable HTTPS (automatic with Let's Encrypt)

## Support

If deployment still fails after these steps:

1. **Check Netlify deploy logs** for specific errors
2. **GitHub Issues:** https://github.com/emabi2002/ilms/issues
3. **Netlify Support:** https://www.netlify.com/support/

## Quick Deploy Links

- **Netlify Dashboard:** https://app.netlify.com
- **Deploy from GitHub:** https://app.netlify.com/start
- **GitHub Repository:** https://github.com/emabi2002/ilms

---

**The configuration is now correct. Trigger a new deploy and it should work!** ✅

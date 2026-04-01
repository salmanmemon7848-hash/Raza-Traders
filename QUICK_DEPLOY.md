# 🚀 Quick Deployment Guide - Raza Traders

## ✅ Build Status: WORKING!

Your application builds successfully. Here's how to deploy it.

---

## 📋 Step-by-Step Deployment

### Option 1: Automated (Recommended for Windows)

```bash
start.bat
```

This will:
1. Install all dependencies
2. Generate Prisma client
3. Set up the database
4. Build the application
5. Start the server

### Option 2: Manual Steps

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Setup Database
```bash
npx prisma generate
npx prisma db push --accept-data-loss
```

#### Step 3: Build Application
```bash
npm run build
```

✅ You should see: "✓ Finalizing page optimization"

#### Step 4: Start Server
```bash
npm start
```

Your app will be running at `http://localhost:3000`

---

## 🌐 Deploy to Hosting Platform

### Important: SQLite Limitations

Your app uses **SQLite**. This means:

❌ **Won't work on:**
- Vercel
- Netlify  
- Serverless platforms

✅ **Will work on:**
- Railway.app
- Render.com
- Your own VPS
- Docker containers

---

## 🚂 Deploy to Railway.app

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Persistent Storage**
   - In Railway dashboard, click your project
   - Click "Volumes" → "Add Volume"
   - Mount path: `/app/prisma`

4. **Set Environment Variables**
   ```
   DATABASE_URL=file:./prisma/dev.db
   NODE_ENV=production
   ```

5. **Deploy**
   - Railway will automatically deploy
   - Wait for build to complete
   - Your app will be live!

---

## 🎨 Deploy to Render.com

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repo

2. **Configure Build Settings**
   ```
   Build Command: npm run build
   Start Command: npm start
   ```

3. **Add Disk Storage**
   - Go to "Disks" tab
   - Add Disk
   - Mount path: `/app/prisma`
   - Size: 1GB minimum

4. **Set Environment Variables**
   ```
   DATABASE_URL=file:./prisma/dev.db
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment

---

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t raza-traders .
```

### Run Container
```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/prisma:/app/prisma \
  --name raza-traders-app \
  raza-traders
```

### Using Docker Compose
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./prisma:/app/prisma
    environment:
      - DATABASE_URL=file:./prisma/dev.db
      - NODE_ENV=production
```

Run:
```bash
docker-compose up -d
```

---

## 💻 Deploy to VPS/Server

### Requirements:
- Node.js 18+ installed
- PM2 for process management

### Steps:

1. **Upload code to server**
   ```bash
   scp -r . user@your-server:/var/www/raza-traders
   ```

2. **SSH to server**
   ```bash
   ssh user@your-server
   cd /var/www/raza-traders
   ```

3. **Install and setup**
   ```bash
   npm install
   npx prisma generate
   npx prisma db push --accept-data-loss
   npm run build
   ```

4. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "raza-traders" -- start
   pm2 save
   pm2 startup
   ```

5. **Setup Nginx (Optional)**
   Create `/etc/nginx/sites-available/raza-traders`:
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

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/raza-traders /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## ✅ Verify Deployment

After deploying, check if everything works:

### 1. Check Health Endpoint
Visit: `https://your-domain.com/api/health`

Expected response:
```json
{
  "status": "healthy",
  "database": {
    "status": "connected",
    "products": 0,
    "customers": 0,
    "bills": 0
  }
}
```

### 2. Test Main Features
- ✅ Homepage loads
- ✅ Can navigate to Inventory
- ✅ Can create bills
- ✅ Dashboard shows data
- ✅ Can add products

### 3. Run Verification Script
```bash
npm run verify
```

---

## 🔧 Troubleshooting

### Error: "Database file not found"
**Solution:**
- Make sure `.env` has: `DATABASE_URL="file:./prisma/dev.db"`
- Check if `prisma/dev.db` exists in your deployed app
- For Docker/VPS, ensure volume is mounted correctly

### Error: "Cannot find module '@prisma/client'"
**Solution:**
```bash
npx prisma generate
```

### App shows blank page
**Solution:**
- Open browser console (F12)
- Check for errors
- Verify API endpoints are responding
- Check `/api/health` endpoint

### Build fails
**Solution:**
- Clear cache: `rm -rf node_modules .next`
- Reinstall: `npm install`
- Rebuild: `npm run build`

---

## 📊 Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads without errors
- [ ] Can access all pages (Inventory, Billing, Customers, Reports)
- [ ] Dashboard displays statistics
- [ ] Can add new products
- [ ] Can create bills
- [ ] Can add customers
- [ ] Low stock alerts work
- [ ] Health check returns healthy status

---

## 🆘 Need Help?

1. **Check logs**: Look at server logs for errors
2. **Health check**: Visit `/api/health` to see if database is connected
3. **Browser console**: Press F12 and check for JavaScript errors
4. **Network tab**: Check if API calls are failing

---

## 📝 Files Created for Deployment

- ✅ `start.bat` - Windows deployment script
- ✅ `start.sh` - Linux/Mac deployment script  
- ✅ `Dockerfile` - Docker container config
- ✅ `.dockerignore` - Docker ignore rules
- ✅ `scripts/setup-db.js` - Database setup utility
- ✅ `scripts/verify-deployment.js` - Verification script
- ✅ `src/app/api/health/route.ts` - Health check endpoint
- ✅ `DEPLOYMENT.md` - Detailed guide
- ✅ `CHECKLIST.md` - Comprehensive checklist

---

## 🎉 Success!

Your app is now deployed! The main issue was the database path configuration, which has been fixed.

**What was fixed:**
- ✅ Database path: `file:./prisma/dev.db` (correct)
- ✅ Next.js config: Added `output: 'standalone'`
- ✅ Build process: Working perfectly
- ✅ Health monitoring: Added `/api/health` endpoint

Good luck with your deployment! 🚀

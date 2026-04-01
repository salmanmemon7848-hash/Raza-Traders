# Deployment Checklist for Raza Traders

## Pre-Deployment Checklist

- [ ] All dependencies are installed (`npm install`)
- [ ] `.env` file is configured with correct database URL
- [ ] Database file exists in `prisma/dev.db`
- [ ] Prisma client is generated (`npx prisma generate`)
- [ ] Database schema is pushed (`npx prisma db push`)
- [ ] Build completes successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console errors during development

## Deployment Steps

### Option 1: Using the startup script (Recommended)

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manual deployment

```bash
# 1. Install dependencies
npm install

# 2. Setup database
npm run setup-db

# OR manually:
npx prisma generate
npx prisma db push --accept-data-loss

# 3. Build the application
npm run build

# 4. Start the server
npm start
```

## Environment Variables

Make sure these are set in your production environment:

```env
DATABASE_URL="file:./prisma/dev.db"
SHADOW_DATABASE_URL="file:./prisma/shadow.db"
```

## Platform-Specific Instructions

### Railway.app

1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Add persistent volume for `/app/prisma` directory
4. Deploy automatically on push

### Render.com

1. Create new Web Service
2. Connect GitHub repository
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Add disk for persistent storage at `/app/prisma`
6. Set environment variables

### VPS/Own Server

1. Upload code to server
2. Install Node.js and npm
3. Run:
```bash
npm install
npm run setup-db
npm run build
pm2 start npm --name "raza-traders" -- start
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY src ./src/
COPY public ./public/
COPY next.config.ts ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install
RUN npx prisma generate
RUN npx prisma db push --accept-data-loss
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Then run:
```bash
docker build -t raza-traders .
docker run -p 3000:3000 -v $(pwd)/prisma:/app/prisma raza-traders
```

## Troubleshooting

### Error: "Cannot find module '.prisma/client'"
**Solution**: Run `npx prisma generate`

### Error: "Database file not found"
**Solution**: 
- Check DATABASE_URL in `.env`
- Ensure database file path is correct
- For production, use absolute path or ensure relative path is correct

### Error: "Table doesn't exist"
**Solution**: Run `npx prisma db push --accept-data-loss`

### App builds but shows blank page
**Solution**:
- Check browser console for errors
- Verify all API routes are working
- Check database connection

### SQLite limitations in production
If you need better production support, consider migrating to PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env` with PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

3. Run: `npx prisma db push`

## Post-Deployment Verification

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] Can navigate to all pages
- [ ] Can create/view products
- [ ] Can generate bills
- [ ] Can add customers
- [ ] Dashboard shows correct data
- [ ] Reports are generating
- [ ] Low stock alerts work
- [ ] PDF generation works (if applicable)

## Rollback Plan

If something goes wrong:

1. Keep backup of previous version
2. Keep backup of database file
3. Document what changed
4. Have rollback procedure ready

## Support

For issues, check:
- Application logs
- Browser console errors
- Network tab for failed API calls
- Database file permissions

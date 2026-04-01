# Deployment Guide for Raza Traders

## Important Notes for Production Deployment

### Database Configuration
This app uses SQLite with Prisma. For production deployment:

1. **Vercel/Netlify**: SQLite is NOT supported on these platforms. Consider:
   - Using PostgreSQL instead (update `prisma/schema.prisma` provider)
   - Deploy to a platform that supports SQLite

2. **Node.js Hosting (Railway, Render, etc.)**:
   - The database file needs to persist between deployments
   - Use a volume mount or external database service

### Environment Variables
Make sure to set these in your deployment platform:
```
DATABASE_URL="file:./prisma/dev.db"
SHADOW_DATABASE_URL="file:./prisma/shadow.db"
```

### Build Steps
```bash
npm install
npx prisma generate
npx prisma db push
npm run build
npm start
```

### Recommended Platforms
- **Railway.app** - Supports SQLite with persistent storage
- **Render.com** - Supports SQLite with disk persistence
- **Your own VPS** - Full control over database files
- **AWS/Azure/GCP** - Use their managed database services

### Alternative: Switch to PostgreSQL
For better production support, consider switching to PostgreSQL:
1. Update `prisma/schema.prisma`: Change `provider = "sqlite"` to `"postgresql"`
2. Update `DATABASE_URL` to use PostgreSQL connection string
3. Deploy with PostgreSQL database (most hosting platforms support this)

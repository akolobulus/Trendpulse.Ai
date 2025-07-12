# Deployment Guide for TrendPulse.AI

This guide explains how to deploy the TrendPulse.AI application on Vercel (frontend) and Heroku (backend).

## Architecture Overview

- **Frontend**: React application deployed on Vercel
- **Backend**: Node.js/Express API deployed on Heroku
- **Database**: Neon PostgreSQL (already hosted)

## Prerequisites

1. Vercel account
2. Heroku account
3. Neon Database URL
4. Google Gemini API key (optional, app works with mock data)

## Backend Deployment (Heroku)

### Step 1: Prepare the Backend

1. Create a new directory for your backend:
```bash
mkdir trendpulse-backend
cd trendpulse-backend
```

2. Copy the backend files:
```bash
cp -r server/ ./
cp -r shared/ ./
cp backend-package.json package.json
cp Procfile ./
cp Dockerfile ./
```

3. Install dependencies:
```bash
npm install
```

### Step 2: Deploy to Heroku

1. Initialize git repository:
```bash
git init
git add .
git commit -m "Initial backend setup"
```

2. Create Heroku app:
```bash
heroku create your-app-name
heroku buildpacks:set heroku/nodejs
```

3. Set environment variables:
```bash
heroku config:set GEMINI_API_KEY=your_gemini_api_key
heroku config:set DATABASE_URL=your_neon_database_url
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-vercel-app.vercel.app
```

4. Deploy:
```bash
git push heroku main
```

5. Your backend will be available at: `https://your-app-name.herokuapp.com`

## Frontend Deployment (Vercel)

### Step 1: Prepare the Frontend

1. Create a new directory for your frontend:
```bash
mkdir trendpulse-frontend
cd trendpulse-frontend
```

2. Copy the frontend files:
```bash
cp -r client/* ./
cp vercel.json ./
```

3. Install dependencies:
```bash
npm install
```

### Step 2: Deploy to Vercel

1. Initialize git repository:
```bash
git init
git add .
git commit -m "Initial frontend setup"
```

2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Add environment variable: `VITE_API_URL=https://your-heroku-app.herokuapp.com`

5. Your frontend will be available at: `https://your-project.vercel.app`

## Environment Variables

### Backend (.env)
```
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=your_neon_database_url_here
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-heroku-app.herokuapp.com
```

## Testing the Deployment

1. Visit your Vercel frontend URL
2. Try searching for a product (e.g., "smartphone")
3. Check that the dashboard loads with market intelligence data
4. Verify all components are working (charts, metrics, insights)

## Troubleshooting

### Common Issues:

1. **CORS Error**: Make sure `FRONTEND_URL` is set correctly in Heroku
2. **API Not Found**: Verify `VITE_API_URL` is set correctly in Vercel
3. **Build Errors**: Check that all dependencies are listed in package.json
4. **Database Connection**: Ensure `DATABASE_URL` is correctly set

### Debug Steps:

1. Check Heroku logs: `heroku logs --tail`
2. Check Vercel function logs in the dashboard
3. Test API endpoints directly: `curl https://your-app.herokuapp.com/api/analyze`

## Scaling Considerations

- **Heroku**: Consider upgrading to paid dynos for better performance
- **Vercel**: Pro plan offers better analytics and performance
- **Database**: Neon offers automatic scaling

## Security Notes

- All API keys are stored as environment variables
- CORS is configured to only allow your frontend domain
- Database uses SSL connections
- No sensitive data is stored in the frontend

## Maintenance

- Monitor application logs regularly
- Update dependencies periodically
- Backup your database configuration
- Test deployments in staging first

## Cost Estimation

- **Vercel**: Free tier sufficient for moderate traffic
- **Heroku**: $7/month for hobby dyno
- **Neon**: Free tier with 0.5GB storage
- **Total**: ~$7-10/month for full deployment
#!/bin/bash

# Build script for TrendPulse.AI deployment

echo "🚀 Building TrendPulse.AI for deployment..."

# Create deployment directories
mkdir -p deploy/backend
mkdir -p deploy/frontend

echo "📦 Preparing backend..."
# Copy backend files
cp -r server/ deploy/backend/
cp -r shared/ deploy/backend/
cp backend-package.json deploy/backend/package.json
cp Procfile deploy/backend/
cp Dockerfile deploy/backend/
cp -r node_modules deploy/backend/ 2>/dev/null || echo "⚠️  No node_modules found, run npm install in backend"

echo "📦 Preparing frontend..."
# Copy frontend files
cp -r client/* deploy/frontend/
cp vercel.json deploy/frontend/
cp -r client/node_modules deploy/frontend/ 2>/dev/null || echo "⚠️  No node_modules found, run npm install in frontend"

echo "🔧 Creating deployment scripts..."

# Create backend deployment script
cat > deploy/backend/deploy.sh << 'EOF'
#!/bin/bash
echo "Deploying backend to Heroku..."
git init
git add .
git commit -m "Deploy backend"
heroku create your-app-name || echo "App already exists"
heroku buildpacks:set heroku/nodejs
git push heroku main
echo "Backend deployed! Set your environment variables:"
echo "heroku config:set GEMINI_API_KEY=your_key"
echo "heroku config:set DATABASE_URL=your_db_url"
echo "heroku config:set FRONTEND_URL=https://your-frontend.vercel.app"
EOF

# Create frontend deployment script
cat > deploy/frontend/deploy.sh << 'EOF'
#!/bin/bash
echo "Deploying frontend to Vercel..."
git init
git add .
git commit -m "Deploy frontend"
vercel --prod
echo "Frontend deployed! Set your environment variables in Vercel dashboard:"
echo "VITE_API_URL=https://your-backend.herokuapp.com"
EOF

chmod +x deploy/backend/deploy.sh
chmod +x deploy/frontend/deploy.sh

echo "✅ Build complete!"
echo ""
echo "Next steps:"
echo "1. cd deploy/backend && ./deploy.sh"
echo "2. cd deploy/frontend && ./deploy.sh"
echo "3. Set environment variables as shown in DEPLOYMENT.md"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
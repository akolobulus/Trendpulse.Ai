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
cp render.yaml deploy/backend/
cp Procfile deploy/backend/
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
echo "Deploying backend to Render..."
git init
git add .
git commit -m "Deploy backend"
echo "Push to GitHub:"
echo "git remote add origin https://github.com/yourusername/trendpulse-backend.git"
echo "git push -u origin main"
echo ""
echo "Then connect to Render:"
echo "1. Go to https://render.com/"
echo "2. Connect your GitHub repository"
echo "3. Create a new Web Service"
echo "4. Set environment variables:"
echo "   - GEMINI_API_KEY=your_key"
echo "   - DATABASE_URL=your_db_url"
echo "   - FRONTEND_URL=https://your-frontend.vercel.app"
echo "   - NODE_ENV=production"
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
echo "VITE_API_URL=https://your-backend.onrender.com"
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
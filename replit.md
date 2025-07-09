# TrendPulse.AI - Market Intelligence Dashboard

## Overview

TrendPulse.AI is a market intelligence dashboard that analyzes trends and generates insights using AI. The application provides comprehensive market analysis including sentiment analysis, regional data, keyword trends, and AI-powered recommendations for market opportunities and strategies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with custom shadcn/ui styling
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL sessions with connect-pg-simple
- **API Integration**: Google Gemini 2.5 Flash for trend analysis generation

### Project Structure
- **Monorepo**: Single repository with separate client, server, and shared code
- **Client**: React application in `/client` directory
- **Server**: Express API in `/server` directory
- **Shared**: Common schemas and types in `/shared` directory

## Key Components

### Data Layer
- **Database Schema**: Users and trend analyses tables
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas for type-safe data validation
- **Storage**: Abstracted storage interface with in-memory implementation for development

### API Layer
- **REST API**: Express-based API with structured error handling
- **Route Structure**: `/api/analyze` for trend analysis, `/api/analysis/:query` for retrieval
- **Gemini Integration**: Google Gemini 2.5 Flash model for generating realistic market trend data
- **Request Logging**: Comprehensive API request logging with response capture

### Frontend Components
- **Dashboard**: Main application view with metrics, charts, and insights
- **Search Form**: Query input with category filtering and analysis triggers
- **Metrics Cards**: Key performance indicators display
- **Trend Chart**: Time series visualization of mention trends
- **Sentiment Display**: Sentiment breakdown with progress indicators
- **Regional Map**: Geographic distribution of mentions
- **Keywords Display**: Top trending keywords and hashtags
- **AI Insights**: AI-generated market opportunities and strategies

### AI Integration
- **Trend Analysis**: AI-powered generation of market intelligence data
- **Data Structure**: Comprehensive analysis including sentiment, regional data, trends, and strategic recommendations
- **Caching**: Query-based caching to avoid redundant API calls

## Data Flow

1. **User Input**: User enters search query in the dashboard
2. **Query Processing**: Frontend sends query to `/api/analyze` endpoint
3. **Cache Check**: Backend checks if analysis already exists for the query
4. **AI Generation**: If not cached, Google Gemini generates comprehensive trend analysis
5. **Data Storage**: Analysis results are stored in PostgreSQL database
6. **Response**: Structured data returned to frontend
7. **Visualization**: React components render charts, metrics, and insights
8. **State Management**: React Query handles caching and state synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **@google/genai**: Google Gemini AI integration for trend analysis
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **recharts**: Chart visualization library

### UI Dependencies
- **@radix-ui**: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Utility for component variants

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React application to `/dist/public`
- **Backend**: esbuild bundles Node.js application to `/dist/index.js`
- **Development**: Vite dev server with HMR for frontend, tsx for backend

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Gemini**: Requires `GEMINI_API_KEY` environment variable
- **Development**: Automatic Vite development server setup
- **Production**: Serves static files and API from single Express server

### Development Workflow
- **Hot Reload**: Vite HMR for frontend changes
- **Type Checking**: TypeScript compilation for type safety
- **Database Migrations**: Drizzle Kit for schema migrations
- **API Logging**: Comprehensive request/response logging for debugging

### Production Considerations
- **Database Connection**: Serverless PostgreSQL with connection pooling
- **Static Assets**: Express serves built frontend from `/dist/public`
- **Error Handling**: Structured error responses with appropriate HTTP status codes
- **Session Management**: PostgreSQL-backed session storage
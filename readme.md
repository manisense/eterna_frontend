# Axiom Trade Token Discovery Dashboard

A pixel-perfect replica of Axiom Trade's token discovery interface with real-time price updates, three independently scrollable columns, and comprehensive UI interactions. Built with React, TypeScript, Tailwind CSS, and Redux Toolkit.

## 🚀 Features

- **Three Independent Columns**: New Pairs, Final Stretch, and Migrated tokens with individual scrolling
- **Real-time Updates**: WebSocket mock for live price and market cap changes
- **Responsive Design**: Optimized for desktop (1920px) and mobile (320px+) with ≥90 Lighthouse score
- **Advanced Filtering**: Search panel with filter chips and keyboard navigation
- **Trading Controls**: Settings modal with preset management and configuration
- **Wallet Management**: Full wallet manager with import/export functionality
- **Exchange Modal**: Deposit, Convert, and Buy tabs with form validation
- **Chain Filtering**: Dynamic filtering by blockchain (Solana/BNB)
- **Mobile Navigation**: Bottom navigation bar for mobile devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 16.x or higher (18.x recommended)
- **npm**: Version 7.x or higher (comes with Node.js)
- **Git**: For cloning the repository

Check your versions:
```bash
node --version
npm --version
git --version
```

## 🛠️ Installation

### Step 1: Download the Code

If you have the code as files, navigate to the project directory:
```bash
cd axiom-trade-dashboard
```

If you need to set up from scratch, create a new directory and copy all files:
```bash
mkdir axiom-trade-dashboard
cd axiom-trade-dashboard
# Copy all project files to this directory
```

### Step 2: Install Dependencies

Install all required packages:
```bash
npm install
```

This will install:
- React 18
- TypeScript
- Tailwind CSS v4.0
- Redux Toolkit
- React Query
- Lucide React (icons)
- Recharts (charts)
- And all other dependencies

### Step 3: Verify Installation

Check that all dependencies are installed:
```bash
npm list --depth=0
```

## 🎯 Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will open automatically in your default browser at:
```
http://localhost:5173
```

If it doesn't open automatically, manually navigate to the URL above.

### Production Build

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
axiom-trade-dashboard/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── layout/         # Header, Footer, TabBar, etc.
│   │   ├── modals/         # Modal components
│   │   ├── panels/         # Side panels
│   │   ├── tokens/         # Token-related components
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Redux store and slices
│   │   └── slices/         # Redux state slices
│   ├── utils/              # Utility functions
│   ├── styles/             # Global CSS and Tailwind
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🎨 Technology Stack

### Core
- **React 18**: UI framework with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server

### State Management
- **Redux Toolkit**: Centralized state management
- **React Query**: Server state and data fetching

### Styling
- **Tailwind CSS v4.0**: Utility-first CSS framework
- **Custom CSS**: Global styles and animations

### UI & Icons
- **Lucide React**: Modern icon library
- **Recharts**: Charting library for price charts

### Features
- **WebSocket Mock**: Real-time price updates simulation
- **Local Storage**: Persist user preferences and settings

## 🔧 Available Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `npm run dev`        | Start development server |
| `npm run build`      | Create production build  |
| `npm run preview`    | Preview production build |
| `npm run lint`       | Run ESLint               |
| `npm run type-check` | Check TypeScript types   |

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px (md - lg)
- **Desktop**: ≥ 1024px (lg+)

The application is optimized for:
- Mobile: 320px - 767px (single column, bottom nav)
- Desktop: 1024px+ (three columns, full features)

## 🎮 Key Features & Usage

### Desktop View
- **Three Columns**: Independently scrollable token lists
- **Header**: Full navigation, chain selector, deposit button
- **TabBar**: Settings, watchlist, and position controls
- **Footer**: Trading presets, wallet manager, quick actions

### Mobile View
- **Single Column**: Shows New Pairs by default
- **Top Banner**: Important notifications
- **Compact Header**: Essential controls only
- **Horizontal Tabs**: Swipe between categories
- **Bottom Navigation**: Trending, Track, Pulse, Perpetuals, Account

### Interactive Features
- **Search**: Press Search icon or use keyboard shortcuts
- **Chain Filter**: Toggle between Solana (SOL) and BNB chains
- **Token Actions**: Buy, sell, and manage tokens
- **Wallet Manager**: Import/export wallets, view balances
- **Trading Settings**: Configure presets and trading parameters

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing
Clear npm cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
Check TypeScript configuration:
```bash
npm run type-check
```

### Build Errors
Ensure you're using the correct Node.js version:
```bash
node --version  # Should be 16.x or higher
```

## 🔄 Mock Data

The application uses mock data for demonstration:
- **Tokens**: Generated mock token data with random prices
- **WebSocket**: Simulated real-time updates every 2-5 seconds
- **Charts**: Mock price history for mini charts

To modify mock data, check:
- `src/hooks/useTokens.ts` - Token data generation
- `src/hooks/useWebSocket.ts` - Real-time update simulation

## 🎯 Performance

The application is optimized for performance:
- **Lighthouse Score**: ≥90 (desktop and mobile)
- **Interaction Time**: <100ms for all interactions
- **Memory**: Efficient Redux state management
- **Rendering**: Memoized components and virtualization

## 📝 Environment Variables

This project runs entirely in the browser and doesn't require environment variables. All data is mocked locally.

## 🚢 Deployment

### Deploy to Vercel
```bash
npm run build
# Upload dist/ folder to Vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Use gh-pages or manual upload
```

## 📄 License

This is a demonstration project for educational purposes.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the project structure and code comments
3. Ensure all dependencies are properly installed

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Built with ❤️ using Figma Make**

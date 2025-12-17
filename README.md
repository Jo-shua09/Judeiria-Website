# Judeiria - Business Consultant Website

A modern React application built with Vite, TypeScript, and Tailwind CSS.

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd judeiria
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── home/          # Home page components
│   ├── layout/        # Layout components
│   └── ui/           # Reusable UI components
├── pages/            # Page components
├── routes/           # Routing configuration
├── assets/           # Static assets
└── lib/              # Utility functions
```

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

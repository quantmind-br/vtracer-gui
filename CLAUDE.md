# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VTracer GUI is an Electron desktop application that provides a graphical interface for the VTracer image vectorization tool. It converts raster images (JPEG, PNG, BMP, GIF) into high-quality SVG vector graphics using the VTracer CLI engine.

## Development Commands

```bash
npm run dev        # Start development server with hot reload
npm run build      # Full production build (TypeScript + Vite + Electron Builder)
npm run lint       # Code linting with ESLint
npm run preview    # Preview production build
```

The build process runs: `tsc` → `vite build` → `electron-builder`

## Architecture

**Technology Stack:**
- React 18 + TypeScript (frontend)
- Electron 30 (desktop framework)
- Vite 5 (build tool)
- Tailwind CSS 4 (styling)

**Key Architecture Patterns:**
- **Electron Main Process** (`electron/main.ts`): Window management, file dialogs, VTracer CLI execution
- **Renderer Process** (`src/`): React UI running in browser context
- **Preload Script** (`electron/preload.ts`): Secure bridge using `contextBridge`

**IPC Communication:**
- `select-file`: Open file selection dialog
- `run-vtracer`: Execute VTracer CLI with parameters
- `read-file`: Read generated SVG files

## Code Organization

```
electron/                    # Electron main process
├── main.ts                 # Main window and IPC handlers
├── preload.ts              # Security bridge between processes
└── electron-env.d.ts       # TypeScript definitions

src/                        # React frontend source
├── components/
│   ├── Sidebar.tsx         # Configuration controls panel
│   └── Preview.tsx         # Image preview and comparison
├── styles/main.css         # Tailwind + custom CSS variables
├── App.tsx                 # Main React component
└── main.tsx                # React entry point
```

## External Dependencies

- **VTracer CLI**: Must be installed separately and available in PATH
- The app spawns VTracer processes using Node.js `spawn`

## Styling System

Dark theme with glass morphism effects using CSS custom properties defined in `src/styles/main.css`:
- `--bg-primary: #0f172a` (main background)
- `--bg-secondary: #1e293b` (secondary backgrounds)
- `--accent-primary: #3b82f6` (primary blue accent)
- `--text-primary: #f8fafc` (main text color)

## Configuration Files

- `vite.config.ts`: Vite bundler with React and Electron plugins
- `electron-builder.json5`: Cross-platform app packaging configuration
- `tsconfig.json`: TypeScript configuration for both src and electron directories
- `tailwind.config.js`: Tailwind CSS configuration
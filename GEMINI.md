# Project Context: VTracer GUI

## Overview
**VTracer GUI** is a desktop application that provides a user-friendly graphical interface for the [VTracer](https://github.com/vtracer-rs/vtracer) command-line tool. It allows users to convert raster images (JPG, PNG, BMP, GIF) into vector graphics (SVG) with real-time preview and parameter adjustments.

## Architecture & Technologies
This is a modern **Electron** application built with:
*   **Frontend:** React 18, TypeScript, Tailwind CSS 4.
*   **Build Tool:** Vite 5 (using `vite-plugin-electron`).
*   **Desktop Shell:** Electron 30.
*   **Iconography:** Lucide React.
*   **Core Engine:** Delegates actual image processing to the system-installed `vtracer` CLI binary via Node.js `spawn`.

### Directory Structure
*   **`src/`**: Renderer process source code (React App).
    *   `components/`: UI components (`Sidebar.tsx`, `Preview.tsx`).
    *   `styles/`: CSS files (Tailwind configuration).
    *   `App.tsx`: Main application component.
*   **`electron/`**: Main process source code.
    *   `main.ts`: Application entry point, window management, and IPC handlers (`select-file`, `run-vtracer`, `read-file`).
    *   `preload.ts`: Preload script to expose IPC capabilities securely.
*   **`dist/`**: Production build of the Renderer process.
*   **`dist-electron/`**: Production build of the Main process.

## Development Setup

### Prerequisites
1.  **Node.js** (v16+)
2.  **VTracer CLI**: Must be installed and accessible in the system PATH (`vtracer --version`).

### Key Commands
| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server and launches the Electron app in development mode with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript, builds the renderer and main processes, and packages the application using `electron-builder`. |
| `npm run lint` | Runs ESLint to check code quality. |
| `npm run preview` | Previews the production build locally. |

## Key Conventions
*   **IPC Communication:** The Renderer triggers file operations and image processing by invoking `ipcRenderer.invoke('channel-name', args)`.
*   **Styling:** Utility-first CSS using Tailwind. Theme variables are defined in `src/styles/main.css`.
*   **State Management:** Local React state is used for UI controls.
*   **File Handling:** The Main process handles native file dialogs and file system reads to bypass browser security restrictions.

## Important Files
*   `electron/main.ts`: Contains the logic for spawning the `vtracer` process and handling its output.
*   `vite.config.ts`: Configures the dual-build process for both React and Electron.
*   `package.json`: Defines dependencies and build scripts.

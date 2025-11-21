import React, { useState } from 'react';
import { Upload, ZoomIn, ZoomOut } from 'lucide-react';

interface PreviewProps {
    originalImage: string | null;
    svgOutput: string | null;
    onSelectFile: () => void;
}

const Preview: React.FC<PreviewProps> = ({ originalImage, svgOutput, onSelectFile }) => {
    const [zoom, setZoom] = useState(100);
    const [viewMode, setViewMode] = useState('split'); // 'split', 'original', 'vector'

    if (!originalImage) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-8">
                <div
                    onClick={onSelectFile}
                    className="border-2 border-dashed border-slate-700 rounded-xl p-12 flex flex-col items-center cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                    <Upload className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Drop an image here</h3>
                    <p className="text-sm opacity-70">or click to browse</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-slate-950 h-full overflow-hidden relative">
            {/* Toolbar */}
            <div className="absolute top-4 right-4 z-10 flex gap-2 bg-slate-900/80 backdrop-blur p-2 rounded-lg border border-slate-800">
                <button
                    onClick={() => setZoom(z => Math.max(10, z - 10))}
                    className="p-2 hover:bg-slate-800 rounded text-slate-300"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>
                <span className="flex items-center px-2 text-xs font-mono text-slate-300 w-12 justify-center">
                    {zoom}%
                </span>
                <button
                    onClick={() => setZoom(z => Math.min(500, z + 10))}
                    className="p-2 hover:bg-slate-800 rounded text-slate-300"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px bg-slate-700 mx-1" />
                <button
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-1 text-xs rounded ${viewMode === 'split' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
                >
                    Split
                </button>
                <button
                    onClick={() => setViewMode('original')}
                    className={`px-3 py-1 text-xs rounded ${viewMode === 'original' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
                >
                    Original
                </button>
                <button
                    onClick={() => setViewMode('vector')}
                    className={`px-3 py-1 text-xs rounded ${viewMode === 'vector' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
                >
                    Vector
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
                <div
                    className="relative shadow-2xl"
                    style={{
                        width: viewMode === 'split' ? 'auto' : undefined,
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'center center',
                        transition: 'transform 0.2s ease-out'
                    }}
                >
                    {viewMode === 'split' && (
                        <div className="flex gap-4">
                            <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                <img src={originalImage} alt="Original" className="max-w-[40vw] max-h-[80vh] object-contain" />
                                <div className="text-center text-xs text-slate-500 mt-2">Original</div>
                            </div>
                            {svgOutput && (
                                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                    <div dangerouslySetInnerHTML={{ __html: svgOutput }} className="max-w-[40vw] max-h-[80vh] [&>svg]:w-full [&>svg]:h-full" />
                                    <div className="text-center text-xs text-slate-500 mt-2">Vectorized</div>
                                </div>
                            )}
                        </div>
                    )}

                    {viewMode === 'original' && (
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                            <img src={originalImage} alt="Original" className="max-w-[80vw] max-h-[80vh] object-contain" />
                        </div>
                    )}

                    {viewMode === 'vector' && svgOutput && (
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                            <div dangerouslySetInnerHTML={{ __html: svgOutput }} className="max-w-[80vw] max-h-[80vh] [&>svg]:w-full [&>svg]:h-full" />
                        </div>
                    )}

                    {viewMode === 'vector' && !svgOutput && (
                        <div className="text-slate-500 text-sm">No vector output yet</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Preview;

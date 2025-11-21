import React from 'react';
import { Settings, Play, Loader2 } from 'lucide-react';

interface SidebarProps {
    options: any;
    setOptions: React.Dispatch<React.SetStateAction<any>>;
    onConvert: () => void;
    isConverting: boolean;
    hasFile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ options, setOptions, onConvert, isConverting, hasFile }) => {
    const handleChange = (key: string, value: any) => {
        setOptions((prev: any) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-y-auto p-4 text-slate-200">
            <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Configuration</h2>
            </div>

            <div className="space-y-6 flex-1">
                {/* Colormode */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400 uppercase">Color Mode</label>
                    <select
                        value={options.colormode}
                        onChange={(e) => handleChange('colormode', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="color">Color</option>
                        <option value="binary">Binary</option>
                    </select>
                </div>

                {/* Hierarchical */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400 uppercase">Hierarchical</label>
                    <select
                        value={options.hierarchical}
                        onChange={(e) => handleChange('hierarchical', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="stacked">Stacked</option>
                        <option value="cutout">Cutout</option>
                    </select>
                </div>

                {/* Mode */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400 uppercase">Curve Fitting</label>
                    <select
                        value={options.mode}
                        onChange={(e) => handleChange('mode', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="spline">Spline</option>
                        <option value="polygon">Polygon</option>
                        <option value="pixel">Pixel</option>
                    </select>
                </div>

                {/* Filter Speckle */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-xs font-medium text-slate-400 uppercase">Filter Speckle</label>
                        <span className="text-xs text-slate-500">{options.filter_speckle} px</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="128"
                        value={options.filter_speckle}
                        onChange={(e) => handleChange('filter_speckle', parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>

                {/* Color Precision */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-xs font-medium text-slate-400 uppercase">Color Precision</label>
                        <span className="text-xs text-slate-500">{options.color_precision} bits</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="8"
                        value={options.color_precision}
                        onChange={(e) => handleChange('color_precision', parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>

                {/* Gradient Step */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-xs font-medium text-slate-400 uppercase">Gradient Step</label>
                        <span className="text-xs text-slate-500">{options.gradient_step}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="255"
                        value={options.gradient_step}
                        onChange={(e) => handleChange('gradient_step', parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>

                {/* Corner Threshold */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-xs font-medium text-slate-400 uppercase">Corner Threshold</label>
                        <span className="text-xs text-slate-500">{options.corner_threshold}°</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="180"
                        value={options.corner_threshold}
                        onChange={(e) => handleChange('corner_threshold', parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-4">
                <button
                    onClick={onConvert}
                    disabled={!hasFile || isConverting}
                    className="w-full btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isConverting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Converting...</span>
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4" />
                            <span>Convert</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

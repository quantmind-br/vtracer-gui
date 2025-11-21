import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';





function App() {
  const [options, setOptions] = useState({
    colormode: 'color',
    hierarchical: 'stacked',
    mode: 'spline',
    filter_speckle: 4,
    color_precision: 6,
    gradient_step: 64,
    corner_threshold: 60,
    preset: 'photo',
  });

  const [inputPath, setInputPath] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [svgOutput, setSvgOutput] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleSelectFile = async () => {
    try {
      const path = await (window.ipcRenderer as any).selectFile();
      if (path) {
        setInputPath(path);
        // Read image as base64
        const base64 = await (window.ipcRenderer as any).readFile(path, 'base64');
        // Determine mime type based on extension (simple check)
        const ext = path.split('.').pop()?.toLowerCase();
        const mime = ext === 'png' ? 'image/png' : ext === 'svg' ? 'image/svg+xml' : 'image/jpeg';
        setOriginalImage(`data:${mime};base64,${base64}`);
        setSvgOutput(null);
      }
    } catch (error) {
      console.error('Failed to select file:', error);
    }
  };

  const handleConvert = async () => {
    if (!inputPath) return;

    setIsConverting(true);
    try {
      // Temporary output path (could be improved to ask user or use temp dir)
      // For now, let's just output to the same directory with .svg extension
      const outputPath = inputPath.replace(/\.[^/.]+$/, "") + ".svg";

      const result = await (window.ipcRenderer as any).runVTracer({
        inputPath,
        outputPath,
        options
      });

      if (result.success) {
        // Use readFile IPC to get the content
        const text = await (window.ipcRenderer as any).readFile(outputPath);
        setSvgOutput(text);
      }
    } catch (error: any) {
      console.error('Conversion failed:', error);
      alert('Conversion failed: ' + error.message);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar
        options={options}
        setOptions={setOptions}
        onConvert={handleConvert}
        isConverting={isConverting}
        hasFile={!!inputPath}
      />
      <Preview
        originalImage={originalImage}
        svgOutput={svgOutput}
        onSelectFile={handleSelectFile}
      />
    </div>
  );
}

export default App;

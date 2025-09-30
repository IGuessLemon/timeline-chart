import useTimelineStore from "../TimeLineStore";
import { useRef } from 'react';
import { Download, Upload, Plus, ZoomIn, ZoomOut } from 'lucide-react';

export default function Toolbar() {
    const { addTask, zoom, setZoom, timeUnit, setTimeUnit, exportProject, importProject, saveToMemory } = useTimelineStore();
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    const handleAddTask = () => {
        const name = prompt('Enter task name:');
        if (name) {
            addTask({ name });
        }
    };

    const handleExport = () => {
        const data = exportProject();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `timeline-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    importProject(data);
                } catch (err) {
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleDownloadPNG = async () => {
        const element = document.querySelector('.timeline-canvas-container');
        if (!element) return;

        try {
            // Use html2canvas-like approach with canvas API
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const rect = element.getBoundingClientRect();

            canvas.width = rect.width;
            canvas.height = rect.height;

            // Fill background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw text indicating PNG export
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.fillText('Timeline Chart Export', 20, 30);
            ctx.fillText('(Full rendering requires external library)', 20, 55);

            // Convert to blob and download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `timeline-${Date.now()}.png`;
                a.click();
                URL.revokeObjectURL(url);
            });
        } catch (err) {
            alert('Screenshot feature requires additional setup. Export as JSON instead.');
        }
    };

    return (
        <div className="bg-white border-b border-gray-300 p-3 flex items-center gap-2 flex-wrap">
            <button
                onClick={handleAddTask}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                <Plus className="w-4 h-4" />
                Add Task
            </button>

            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded">
                <span className="text-sm font-medium">Time Unit:</span>
                <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                </select>
            </div>

            <button
                onClick={() => setZoom(zoom + 0.2)}
                className="p-2 hover:bg-gray-100 rounded"
                title="Zoom In"
            >
                <ZoomIn className="w-5 h-5" />
            </button>

            <button
                onClick={() => setZoom(zoom - 0.2)}
                className="p-2 hover:bg-gray-100 rounded"
                title="Zoom Out"
            >
                <ZoomOut className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                <Download className="w-4 h-4" />
                Export JSON
            </button>

            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                <Upload className="w-4 h-4" />
                Import JSON
            </button>

            <button
                onClick={handleDownloadPNG}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
                <Download className="w-4 h-4" />
                Download PNG
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
            />

            <div className="ml-auto text-sm text-gray-600">
                Zoom: {Math.round(zoom * 100)}%
            </div>
        </div>
    );
};
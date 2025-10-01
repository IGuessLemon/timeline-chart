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
    const { tasks, totalUnits, timeUnit, zoom } = useTimelineStore.getState();
    
    try {
      const unitWidth = 60 * zoom;
      const rowHeight = 50;
      const headerHeight = 40;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = totalUnits * unitWidth;
      canvas.height = headerHeight + (tasks.length * rowHeight);
      
      // Fill background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw header background
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, headerHeight);
      
      // Draw header labels
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const getUnitLabel = (index) => {
        if (timeUnit === 'days') return `D${index + 1}`;
        if (timeUnit === 'weeks') return `W${index + 1}`;
        if (timeUnit === 'months') {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return months[index % 12];
        }
        return `${index + 1}`;
      };
      
      // Draw header cells and labels
      for (let i = 0; i < totalUnits; i++) {
        const x = i * unitWidth;
        // Border
        ctx.strokeStyle = '#d1d5db';
        ctx.strokeRect(x, 0, unitWidth, headerHeight);
        // Label
        ctx.fillStyle = '#374151';
        ctx.fillText(getUnitLabel(i), x + unitWidth / 2, headerHeight / 2);
      }
      
      // Draw grid lines and tasks
      tasks.forEach((task, idx) => {
        const y = headerHeight + (idx * rowHeight);
        
        // Draw row background (alternating)
        ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#f9fafb';
        ctx.fillRect(0, y, canvas.width, rowHeight);
        
        // Draw grid lines
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        for (let i = 0; i <= totalUnits; i++) {
          ctx.beginPath();
          ctx.moveTo(i * unitWidth, y);
          ctx.lineTo(i * unitWidth, y + rowHeight);
          ctx.stroke();
        }
        
        // Draw horizontal line
        ctx.beginPath();
        ctx.moveTo(0, y + rowHeight);
        ctx.lineTo(canvas.width, y + rowHeight);
        ctx.stroke();
        
        // Draw task bar
        const taskX = task.startWeek * unitWidth;
        const taskWidth = task.duration * unitWidth;
        const taskY = y + 4;
        const taskHeight = rowHeight - 8;
        
        // Task bar background
        ctx.fillStyle = task.color;
        ctx.fillRect(taskX, taskY, taskWidth, taskHeight);
        
        // Task bar border
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(taskX, taskY, taskWidth, taskHeight);
        
        // Task name
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Truncate text if too long
        let displayText = task.name;
        const maxWidth = taskWidth - 10;
        let textWidth = ctx.measureText(displayText).width;
        
        if (textWidth > maxWidth) {
          while (textWidth > maxWidth && displayText.length > 0) {
            displayText = displayText.slice(0, -1);
            textWidth = ctx.measureText(displayText + '...').width;
          }
          displayText += '...';
        }
        
        ctx.fillText(displayText, taskX + taskWidth / 2, taskY + taskHeight / 2);
      });
      
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
      console.error('PNG export error:', err);
      alert('Error exporting PNG. Please try again.');
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
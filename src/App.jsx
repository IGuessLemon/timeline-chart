import { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import TimelineCanvas from './components/TimelineCanvas';
import useTimelineStore from './TimeLineStore';

export default function App() {
  const { tasks, saveToMemory } = useTimelineStore();
  const [savedData, setSavedData] = useState(null);
  
  // Save to memory on changes
  useEffect(() => {
    if (tasks.length > 0) {
      const data = saveToMemory();
      setSavedData(data);
    }
  }, [tasks]);
  
  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h1 className="text-2xl font-bold">Timeline Chart Manager</h1>
        <p className="text-sm opacity-90">created and maintained by <a style={{textDecoration: "underline"}} href='https://www.linkedin.com/in/mahbub-hasan-634766378/'>Mahbub Hasan</a></p>      </div>
      
      <Toolbar />
      
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 timeline-canvas-container overflow-hidden">
          <TimelineCanvas />
        </div>
      </div>
      
      {tasks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-gray-400">
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm">Click "Add Task" to get started</p>
          </div>
        </div>
      )}
    </div>
  );
}
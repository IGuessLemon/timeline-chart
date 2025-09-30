import { create } from 'zustand';

const useTimelineStore = create((set, get) => ({
  tasks: [],
  timeUnit: 'weeks', // 'days', 'weeks', 'months'
  totalUnits: 52,
  zoom: 1,
  panX: 0,
  panY: 0,
  selectedTask: null,
  
  setTimeUnit: (timeUnit) => set((state) => {
    // Adjust totalUnits based on time unit
    let totalUnits = 52;
    if (timeUnit === 'days') totalUnits = 365;
    if (timeUnit === 'months') totalUnits = 12;
    return { timeUnit, totalUnits };
  }),
  
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, { 
      ...task, 
      id: Date.now(), 
      color: '#3b82f6',
      startWeek: 0,
      duration: 4
    }] 
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  
  moveTaskUp: (id) => set((state) => {
    const idx = state.tasks.findIndex(t => t.id === id);
    if (idx > 0) {
      const newTasks = [...state.tasks];
      [newTasks[idx], newTasks[idx - 1]] = [newTasks[idx - 1], newTasks[idx]];
      return { tasks: newTasks };
    }
    return state;
  }),
  
  moveTaskDown: (id) => set((state) => {
    const idx = state.tasks.findIndex(t => t.id === id);
    if (idx < state.tasks.length - 1) {
      const newTasks = [...state.tasks];
      [newTasks[idx], newTasks[idx + 1]] = [newTasks[idx + 1], newTasks[idx]];
      return { tasks: newTasks };
    }
    return state;
  }),
  
  setZoom: (zoom) => set({ zoom: Math.max(0.5, Math.min(3, zoom)) }),
  setPan: (panX, panY) => set({ panX, panY }),
  setSelectedTask: (id) => set({ selectedTask: id }),
  
  importProject: (data) => set({
    tasks: data.tasks || [],
    timeUnit: data.timeUnit || 'weeks',
    totalUnits: data.totalUnits || 52
  }),
  
  exportProject: () => {
    const state = get();
    return {
      tasks: state.tasks,
      timeUnit: state.timeUnit,
      totalUnits: state.totalUnits,
      version: '1.0'
    };
  },
  
  saveToMemory: () => {
    const state = get();
    const data = {
      tasks: state.tasks,
      timeUnit: state.timeUnit,
      totalUnits: state.totalUnits
    };
    // Store in component state instead of localStorage
    return data;
  }
}));

export default useTimelineStore;
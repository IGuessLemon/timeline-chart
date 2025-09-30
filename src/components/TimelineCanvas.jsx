import useTimelineStore from "../TimeLineStore";
import { useState, useRef, useEffect } from 'react';
import TaskBar from "./TaskBar";

export default function TimelineCanvas() {
    const { tasks, totalUnits, timeUnit, zoom, panX, panY, updateTask, setSelectedTask, selectedTask } = useTimelineStore();
    const canvasRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeData, setResizeData] = useState(null);

    const weekWidth = 60 * zoom;
    const rowHeight = 50;

    // Get unit label
    const getUnitLabel = (index) => {
        if (timeUnit === 'days') return `D${index + 1}`;
        if (timeUnit === 'weeks') return `W${index + 1}`;
        if (timeUnit === 'months') {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[index % 12];
        }
        return `${index + 1}`;
    };

    const handleMouseDown = (e, taskId, action = 'drag') => {
        e.preventDefault();
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const task = tasks.find(t => t.id === taskId);

        if (action === 'drag') {
            setIsDragging(taskId);
            setDragStart({ x, startWeek: task.startWeek });
        } else {
            setIsResizing(taskId);
            setResizeData({
                side: action,
                startX: x,
                startWeek: task.startWeek,
                startDuration: task.duration
            });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging && !isResizing) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;

        if (isDragging) {
            const deltaWeeks = Math.round((x - dragStart.x) / weekWidth);
            const newStartWeek = Math.max(0, Math.min(totalUnits - 1, dragStart.startWeek + deltaWeeks));
            updateTask(isDragging, { startWeek: newStartWeek });
        } else if (isResizing) {
            const deltaWeeks = Math.round((x - resizeData.startX) / weekWidth);
            const task = tasks.find(t => t.id === isResizing);

            if (resizeData.side === 'left') {
                const newStart = Math.max(0, resizeData.startWeek + deltaWeeks);
                const newDuration = Math.max(1, resizeData.startDuration - deltaWeeks);
                if (newStart + newDuration <= totalUnits) {
                    updateTask(isResizing, { startWeek: newStart, duration: newDuration });
                }
            } else {
                const newDuration = Math.max(1, resizeData.startDuration + deltaWeeks);
                if (task.startWeek + newDuration <= totalUnits) {
                    updateTask(isResizing, { duration: newDuration });
                }
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeData(null);
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, dragStart, resizeData]);

    return (
        <div className="flex-1 overflow-auto" ref={canvasRef}>
            <div className="relative" style={{ width: `${totalUnits * weekWidth}px`, minHeight: '100%' }}>
                {/* Week headers */}
                <div className="sticky top-0 bg-white z-10 border-b-2 border-gray-300 flex">
                    {Array.from({ length: totalUnits }, (_, i) => (
                        <div
                            key={i}
                            className="border-r border-gray-200 flex items-center justify-center text-xs font-medium"
                            style={{ width: `${weekWidth}px`, height: '40px' }}
                        >
                            {getUnitLabel(i)}
                        </div>
                    ))}
                </div>

                {/* Task rows */}
                {tasks.map((task, idx) => (
                    <div
                        key={task.id}
                        className={`relative border-b border-gray-200 ${selectedTask === task.id ? 'bg-blue-50' : ''}`}
                        style={{ height: `${rowHeight}px` }}
                    >
                        {/* Week grid lines */}
                        {Array.from({ length: totalUnits }, (_, i) => (
                            <div
                                key={i}
                                className="absolute border-r border-gray-100"
                                style={{
                                    left: `${i * weekWidth}px`,
                                    width: `${weekWidth}px`,
                                    height: '100%'
                                }}
                            />
                        ))}

                        {/* Task bar */}
                        <TaskBar
                            task={task}
                            weekWidth={weekWidth}
                            rowHeight={rowHeight}
                            onDragStart={(e, id) => handleMouseDown(e, id, 'drag')}
                            onResizeStart={(e, id, side) => handleMouseDown(e, id, side)}
                            onClick={setSelectedTask}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
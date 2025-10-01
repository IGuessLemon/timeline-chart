import useTimelineStore from "../TimeLineStore";
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function Sidebar({ width, setWidth }) {
    const { tasks, selectedTask, updateTask, deleteTask, moveTaskUp, moveTaskDown } = useTimelineStore();

    const startResizing = (e) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = width;

        const doDrag = (e) => {
            const newWidth = Math.max(150, startWidth + (e.clientX - startX)); // min 150px
            setWidth(newWidth);
        };

        const stopDrag = () => {
            document.removeEventListener("mousemove", doDrag);
            document.removeEventListener("mouseup", stopDrag);
        };

        document.addEventListener("mousemove", doDrag);
        document.addEventListener("mouseup", stopDrag);
    };

    return (
        <div
            className="bg-gray-50 border-r border-gray-300 overflow-y-auto relative"
            style={{ width }}
        >
            <div className="sticky top-0 bg-gray-100 p-4 border-b border-gray-300 font-bold">
                Tasks
            </div>
            {tasks.map((task, idx) => (
                <div
                    key={task.id}
                    className={`p-3 border-b border-gray-200 ${selectedTask === task.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    style={{ height: '50px' }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <input
                                type="color"
                                value={task.color}
                                onChange={(e) => updateTask(task.id, { color: e.target.value })}
                                className="w-8 h-6 rounded cursor-pointer border border-gray-300"
                                title="Click to change color"
                            />
                            <input
                                type="text"
                                value={task.name}
                                onChange={(e) => updateTask(task.id, { name: e.target.value })}
                                className="flex-1 bg-transparent border-none outline-none text-sm font-medium truncate"
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => moveTaskUp(task.id)}
                                className="p-1 hover:bg-gray-200 rounded"
                                disabled={idx === 0}
                            >
                                <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => moveTaskDown(task.id)}
                                className="p-1 hover:bg-gray-200 rounded"
                                disabled={idx === tasks.length - 1}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="p-1 hover:bg-red-100 rounded text-red-600"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Resizer handle */}
            <div
                onMouseDown={startResizing}
                className="absolute top-0 right-0 w-2 h-full cursor-col-resize bg-transparent hover:bg-gray-300"
            />
        </div>
    );
};

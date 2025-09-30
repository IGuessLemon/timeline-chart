
export default function TaskBar({ task, weekWidth, rowHeight, onDragStart, onResizeStart, onClick }) {
  const x = task.startWeek * weekWidth;
  const width = task.duration * weekWidth;
  
  return (
    <div
      className="absolute cursor-move group"
      style={{
        left: `${x}px`,
        width: `${width}px`,
        height: `${rowHeight - 8}px`,
        top: '4px'
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onDragStart(e, task.id);
        }
      }}
      onClick={() => onClick(task.id)}
    >
      <div
        className="h-full rounded flex items-center justify-center text-white text-sm font-medium relative"
        style={{ backgroundColor: task.color }}
      >
        <span className="truncate px-2">{task.name}</span>
        
        {/* Resize handles */}
        <div
          className="absolute left-0 top-0 w-2 h-full cursor-ew-resize hover:bg-black/20"
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeStart(e, task.id, 'left');
          }}
        />
        <div
          className="absolute right-0 top-0 w-2 h-full cursor-ew-resize hover:bg-black/20"
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeStart(e, task.id, 'right');
          }}
        />
      </div>
    </div>
  );
};
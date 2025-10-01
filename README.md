# Timeline Chart Manager

A powerful and interactive timeline chart application built with React and Vite. Plan, visualize, and manage your project timelines with ease.


## 🚀 Features

### Core Functionality
- **Interactive Task Management**: Add, edit, delete, and reorder tasks
- **Drag & Drop**: Move tasks across the timeline by dragging
- **Resizable Tasks**: Adjust task duration by dragging the left or right edges
- **Multiple Time Units**: Switch between Days (365), Weeks (52), or Months (12)
- **Color Customization**: Assign custom colors to each task for better visualization
- **Task Reordering**: Move tasks up or down in the list

### Visualization
- **Zoom Controls**: Zoom in/out to see more or less detail (50% to 300%)
- **Grid View**: Clear grid lines for better time alignment
- **Task Selection**: Click to select and highlight tasks

### Data Management
- **JSON Export**: Save your project as a JSON file
- **JSON Import**: Load previously saved projects
- **PNG Export**: Download timeline as an image (basic implementation)

## 📦 Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm package manager

### Step 1: Clone or Download
Download the project files to your computer.

### Step 2: Install Dependencies
Open your terminal in the project folder and run:

```bash
npm install
```


### Step 3: Run the Application
Start the development server:

```bash
npm run dev
```


The application will open in your browser at `http://localhost:5173`

### Step 4: Build for Production (Optional)
To create a production build:

```bash
npm run build
```


## 📚 Libraries Used

This project uses the following libraries:

### Core Framework
- **React**: JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server

### State Management
- **Zustand**: Lightweight state management solution

### UI Components
- **Lucide React**: Icon library for React
- **Tailwind CSS**: Utility-first CSS framework

## 🎯 How to Use

### Adding Tasks
1. Click the **"Add Task"** button in the toolbar
2. Enter a task name in the prompt
3. The task will appear in the sidebar and timeline

### Moving Tasks
- **Drag horizontally**: Click and drag the task bar to move it to a different time period
- **Resize**: Drag the left or right edge of the task bar to change its duration
- **Reorder**: Use the up/down arrow buttons in the sidebar to change task order

### Customizing Tasks
- **Change Color**: Click the color picker next to the task name in the sidebar
- **Rename**: Click on the task name in the sidebar and type a new name
- **Delete**: Click the trash icon to remove a task

### Time Unit Selection
- Use the **Time Unit** dropdown in the toolbar
- Choose between:
  - **Days**: Shows 365 days (D1, D2, D3...)
  - **Weeks**: Shows 52 weeks (W1, W2, W3...)
  - **Months**: Shows 12 months (Jan, Feb, Mar...)

### Zoom Controls
- **Zoom In**: Click the zoom in button (magnifier with +)
- **Zoom Out**: Click the zoom out button (magnifier with -)
- Current zoom level is displayed in the toolbar (50% - 300%)

### Saving & Loading Projects
- **Export JSON**: Click "Export JSON" to save your project as a `.json` file
- **Import JSON**: Click "Import JSON" and select a previously saved `.json` file
- **Download PNG**: Click "Download PNG" to export the timeline as an image


### Vite and Tailwind Configuration
Vite is configured in `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## ⚠️ Known Limitations

- **PNG Export**: Currently provides basic export functionality. For high-quality screenshots, consider using browser screenshot tools
- **Data Persistence**: Projects are stored in memory during the session. Remember to export your work before closing the browser
- **Browser Storage**: localStorage is not used in this version. All data is kept in application state

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests


## 💡 Tips & Tricks

1. **Quick Navigation**: Use zoom out to see the entire timeline, then zoom in to work on specific tasks
2. **Color Coding**: Use different colors for different types of tasks (e.g., red for critical, blue for regular)
3. **Regular Exports**: Export your project regularly to avoid losing work
4. **Time Unit**: Choose the time unit based on your project scope:
   - Days: For short-term projects (weeks to months)
   - Weeks: For medium-term projects (months to a year)
   - Months: For long-term projects (year or more)

## 🆘 Troubleshooting

### Tasks not appearing
- Make sure you've added tasks using the "Add Task" button
- Check if you're scrolled to the right position in the timeline

### Drag and drop not working
- Ensure you're clicking on the task bar itself, not the resize handles
- Try refreshing the browser if interactions become unresponsive

### Import not working
- Make sure the JSON file was exported from this application
- Check that the file is not corrupted

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the How to Use section
3. Open an issue on the project repository

## 👨‍💻 About the Developer

This project was developed by **Mahbub Hasan**, a skilled web developer specializing in modern JavaScript frameworks and interactive web applications.

### Get in Touch

Are you looking for a talented web developer to bring your ideas to life? I'm available for freelance projects and full-time opportunities!

- **Email**: [bnlimon0@gmail.com](mailto:bnlimon0@gmail.com)
- **LinkedIn**: [Mahbub Hasan](https://www.linkedin.com/in/mahbub-hasan-634766378/)

### What I Can Do For You

- 🚀 Build modern, responsive web applications
- ⚛️ Expert in React, Next.js, Nest.js, Express and cutting-edge JavaScript frameworks
- 🎨 Create beautiful UIs with Tailwind CSS and modern design principles
- 📊 Develop interactive data visualization and management tools
- 🔧 Implement efficient state management solutions
- 📱 Ensure mobile-first, responsive designs
- 🎯 Deliver clean, maintainable, and well-documented code

Whether you need a custom web application, an interactive dashboard, or a complete website redesign, I'm here to help turn your vision into reality.

**Let's build something amazing together!**

---

**Enjoy planning your projects with Timeline Chart Manager!** 🎉
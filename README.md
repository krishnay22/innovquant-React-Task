# 📝 React Notes & Task Management App

A modern, responsive React application featuring post management with notes, todo functionality, and component communication demonstrations. Built with React 18, Vite, and TailwindCSS.

## 🚀 Features

### 📋 Posts Management
- **API Integration**: Fetches posts from JSONPlaceholder API
- **Notes System**: Add, edit, and delete multiple notes per post
- **Search & Filter**: Real-time search functionality
- **Advanced Pagination**: Smart navigation with ellipsis (« ‹ 1 2 3 › »)
- **Responsive Design**: Mobile-first approach with glassmorphism UI

### ✅ Todo List
- **Task Management**: Create, edit, delete, and toggle tasks
- **Filtering**: View all, pending, or completed tasks
- **Local Storage**: Persistent data storage
- **Modern UI**: Clean, Apple-inspired design

### 🔄 Component Communication
- **Parent-Child Demo**: Interactive demonstration of React data flow
- **Props & State**: Shows controlled communication patterns
- **Real-time Feedback**: Visual state changes and character counting

## 🛠️ Technology Stack

- **React 18.3.1** - Modern React with hooks
- **Vite 5.4.10** - Fast build tool and dev server
- **React Router DOM 6.27.0** - Client-side routing
- **TailwindCSS 3.4.14** - Utility-first CSS framework
- **Redux Toolkit 2.3.0** - State management (ready for scaling)
- **PropTypes** - Runtime type checking
- **ESLint** - Code quality and consistency

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PostItem.jsx    # Individual post card
│   ├── PostList.jsx    # Posts grid layout
│   ├── PostModal.jsx   # Notes management modal
│   ├── TodoList.jsx    # Task management
│   ├── Parent.jsx      # Parent component demo
│   ├── Child.jsx       # Child component demo
│   └── Navbar.jsx      # Navigation component
├── pages/              # Route-level components
│   ├── PostViewer.jsx  # Main posts page
│   ├── TodoPage.jsx    # Todo functionality
│   └── ComponentsPage.jsx # Component demo
├── hooks/              # Custom React hooks
│   └── useNotes.js     # Notes management logic
└── routes/             # Routing configuration
    └── AddRoutes.jsx   # App routing setup
```

## 🎯 Key Features Demonstrated

### React Concepts
- **Hooks**: useState, useEffect, custom hooks
- **Component Patterns**: Composition, props drilling, conditional rendering
- **State Management**: Local state, Redux setup, localStorage integration
- **Event Handling**: Form inputs, button clicks, modal interactions

### Modern Development
- **API Integration**: Async/await, error handling, loading states
- **Responsive Design**: Mobile-first, flexible layouts
- **Performance**: Pagination, efficient re-renders, code splitting
- **User Experience**: Smooth animations, intuitive interactions

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontEnd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Pages Overview

- **Posts** - Browse and manage posts with notes (Default page)
- **Todo** - Task management with filtering and persistence
- **Components** - Interactive parent-child communication demo

## 🎨 Design Features

- **Glassmorphism Effects**: Modern backdrop-blur styling
- **Smooth Animations**: Hover effects and transitions
- **Mobile Responsive**: Touch-friendly interface
- **Clean Typography**: Consistent font hierarchy
- **Intuitive Navigation**: Centered nav with active states

## 🔧 Development Tools

- **Vite**: Fast HMR and optimized builds
- **ESLint**: Code quality enforcement
- **TailwindCSS**: Rapid UI development
- **React DevTools**: Component debugging
- **Redux DevTools**: State management debugging

---

*Built with ❤️ using modern React development practices*

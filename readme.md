# Task Management Application
A full-stack Task Management application built entirely with TypeScript, focusing on strong type safety, clean architecture, and a modern UI experience.

### StartBackend
```bash
/backend
bun install
bun index.ts
```

### StartFrontend
```bash
/frontend
bun install
bun run dev
```

### .env file(backend)
```bash
MONGODB_URL=mongodb+srv://.....
```

## 🚀 Tech Stack
Frontend: React + TypeScript + tailwindscss
Backend: Node.js + Express + TypeScript + mongoDB 

## 📌 Type Safety
The entire project is written in TypeScript with proper type safety.  
All request and response types are strictly defined.  
👉 For reviewing all backend types, check:
```bash
backend/tasks/types.ts
```

## ✨ Features
✅ Filter tasks by priority  
✅ Filter tasks by status  
✅ Search bar to search tasks  
✅ Priority levels (low, medium, high)  
✅ Dark Mode & Light Mode  
✅ Fully type-safe API request & responses

## 🧠 Architectural Decisions
### 🔹 Frontend Filtering Optimization
Although I have created API's filtering by status and priority, I chose to perform filtering on the frontend side. to improve optimization.

## 🎨 Theme (Dark & Light Mode)
Both Dark Mode and Light Mode are implemented. The theme is created from [ThemeCreator](https://tweakcn.com/editor/theme).
If you want to use another theme, just copy the theme from [ThemeCreator](https://tweakcn.com/editor/theme) and paste it in the
```bash
frontend/src/index.css
```
## 🏗 Backend Architecture
The main entry file:
```bash
backend/index.ts
```

Database Connection and models:
```bash
backend/database/
```

## 🌐 API Endpoints
🔹 Base Route
```bash
http://localhost:5000/api/tasks
```

### 1️⃣ Get Tasks (With Status Filter)
```bash
endpoint: GET ?status="status_value"

requestSchema: export type getFilterTask = {
    status: 'pending' | 'in-progress' | 'completed',
}

responseSchema: export type task = {
    _id: string
    title: string,
    description: string,
    status: 'pending' | 'in-progress' | 'completed',
    priority: 'low' | 'medium' | 'high'
    createdAt?: Date
}
```

### 2️⃣ Create Task
```bash
endpoint: POST /

requestSchema: export type createTask = {
    status: 'pending' | 'in-progress' | 'completed',
    priority: 'low' | 'medium' | 'high'
    title: string,
    description: string,
    createdAt?: Date
}

responseSchema: export type task = {
    title: string, 
    status: 'pending' | 'in-progress' | 'completed',
    priority: 'low' | 'medium' | 'high'
    createdAt?: Date
}
```

### 3️⃣ Update Task Status
```bash
endpoint: PATCH /status/:id/:status

requestSchema: export type updateTaskStatus = {
    id: string,
    status: 'pending' | 'in-progress' | 'completed',
}

responseSchema: message: 'Successfully updated!'
```

### 4️⃣ Update Task Priority
```bash
endpoint: PATCH /priority/:id/:priority

requestSchema: export type updateTaskPriority = {
    id: string,
    priority: 'low' | 'medium' | 'high',
}

responseSchema: message: 'Successfully updated!'
```

### 5️⃣ Delete Task
```bash
endpoint: DELETE /:id

requestSchema: export type deleteTask = {
    id: string,
}

responseSchema: message: 'Successfully deleted!'
```

## PROJECT STRUCTURE
```bash
├── Backend/
│   ├── database/
│   │   ├── index.ts
│   │   └── model.ts
│   │
│   ├── tasks/
│   │   ├── task.controller.ts
│   │   ├── task.routes.ts
│   │   └── types.ts
│   │
│   └── index.ts
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   └── (All components)
    │   │
    │   └── App.tsx   # Contains base HTML structure
    │
    └── types.ts
```


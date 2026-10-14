# MHRobin Student Task Manager

**Organize Your Tasks. Stay Productive.**

MHRobin Student Task Manager is a beginner-friendly React application that helps students add tasks, track their progress, mark tasks as completed, and delete tasks they no longer need. It is built to practice core React concepts through a practical project.

## Features

**Core**
- Add tasks with a validated form (empty and space-only input rejected, titles trimmed)
- Display tasks with a reusable `TaskItem` component, unique IDs and React keys
- Mark tasks completed or pending with a checkbox (strikethrough + status badge)
- Delete tasks with a confirmation prompt
- Conditional rendering: "No tasks available" empty state and filter-specific messages
- Live statistics: Total, Completed and Pending (derived from state)

**Bonus**
- Filter buttons: All, Completed, Pending (statistics always reflect all tasks)
- Remaining-task counter (e.g. "3 tasks remaining")
- Reusable `Card` component using the `children` prop
- `ErrorBoundary` class component with a friendly fallback UI, retry and refresh options
- `localStorage` persistence, with graceful handling of corrupted JSON
- Responsive, accessible design (labels, semantic HTML, visible focus states)

## Technologies Used

- React 18 (functional components + `useState` / `useEffect`)
- Vite
- JavaScript (no TypeScript)
- HTML5 and plain CSS3
- Browser `localStorage`

## Project Structure

```text
mhrobin-student-task-manager/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── TaskFilter.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskStats.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Setup and Run

Requirements: [Node.js](https://nodejs.org/) 18 or newer.

### Windows PowerShell + VS Code

```powershell
cd mhrobin-student-task-manager
code .            # optional: open the folder in VS Code
npm install
npm run dev
```

You can also use the VS Code integrated terminal (`Ctrl + ``). Open the local URL shown in the terminal (usually http://localhost:5173).

### Other commands

```powershell
npm run build     # production build in /dist
npm run preview   # preview the production build
```

## Creating the Project from Scratch (optional)

```powershell
npm create vite@latest mhrobin-student-task-manager -- --template react
cd mhrobin-student-task-manager
npm install
npm run dev
```

Then replace the generated files with the files in this project.

## Where Each React Concept Is Demonstrated

| Concept | Location |
| --- | --- |
| Components & composition | `src/components/*`, assembled in `App.jsx` |
| JSX | All `.jsx` files |
| Props | `App` passes data and handlers to `TaskForm`, `TaskList`, `TaskItem`, `TaskFilter`, `TaskStats` |
| Events | `TaskForm` (submit/change), `TaskItem` (checkbox/delete), `TaskFilter` (click) |
| Conditional rendering | `TaskList` (empty states), `TaskItem` (badge), `TaskForm` (messages) |
| `children` prop | `Card.jsx`, used in `App.jsx` and `TaskStats.jsx` |
| State (`useState`) | `App.jsx`, `TaskForm.jsx` with immutable updates |
| Lists & keys | `TaskList.jsx` (`tasks.map` with `key={task.id}`), `TaskFilter.jsx` |
| Error handling | `ErrorBoundary.jsx`, wrapped around `TaskList` in `App.jsx` |
| Persistence | `loadTasks()` and the save `useEffect` in `App.jsx` |

## Manual Testing Checklist

**Add / validation**
- [ ] Adding "Read chapter 3" shows it in the list, clears the input, and shows a success message
- [ ] Submitting an empty input shows a validation message
- [ ] Submitting only spaces shows a validation message
- [ ] Typing valid text clears the validation message
- [ ] "  Study  " is saved as "Study" (trimmed)
- [ ] Double-clicking Add Task quickly adds only one task

**Complete / delete**
- [ ] Checking a task shows strikethrough and a "Completed" badge; unchecking reverts it
- [ ] Toggling one task does not change others
- [ ] Delete asks for confirmation; Cancel keeps the task, OK removes only that task

**Statistics / counter**
- [ ] Total, Completed and Pending update immediately after add, toggle, delete
- [ ] "N tasks remaining" matches the Pending count ("1 task remaining" is singular)

**Filtering / empty states**
- [ ] All, Completed and Pending show the right tasks
- [ ] Statistics do not change when switching filters
- [ ] With no tasks, "No tasks available" appears
- [ ] Completed filter with none completed shows a friendly message; same for Pending

**Persistence / errors**
- [ ] Refreshing the page keeps all tasks and their status
- [ ] In DevTools, set `localStorage["mhrobin-student-task-manager.tasks"]` to `{bad json` and refresh: the app loads with an empty list, no crash
- [ ] (Optional) Temporarily throw an error inside `TaskList`: the fallback UI appears with Try again / Refresh page

**Branding / UI**
- [ ] Browser tab title is "MHRobin | Student Task Manager"
- [ ] Header shows "MHRobin Student Task Manager" and "Organize Your Tasks. Stay Productive."
- [ ] Footer shows "© 2026 MHRobin. All rights reserved."
- [ ] Layout works on mobile, tablet and desktop widths; Tab key shows visible focus

---

© 2026 MHRobin. All rights reserved.

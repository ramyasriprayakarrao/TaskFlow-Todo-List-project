TECHORBIT LEARNING INTERNSHIP — TASK 2
TO-DO LIST APPLICATION
=====================================

PROJECT FOLDER
techorbit-task2-todo/
  index.html   Page structure and task interface
  style.css    Colours, layout and responsive design
  script.js    Add, edit, delete, complete, filter and LocalStorage logic
  README.txt   Setup and usage guide

FEATURES
--------
1. Add a new task.
2. Edit an existing active task.
3. Delete a task.
4. Mark a task as completed or active again.
5. View All, Active, and Completed tasks.
6. Clear all completed tasks after confirmation.
7. See total, active and completed task counts.
8. Automatically save tasks in browser LocalStorage.
9. Responsive layout for desktop and mobile screens.

REQUIREMENTS
------------
- A modern web browser (Chrome, Edge, Firefox, etc.)
- Visual Studio Code is recommended but not compulsory.
- No Node.js, database, or internet connection is required to run the app.
  (The optional Google Font may use internet; system fallback fonts are included.)

HOW TO RUN IN VS CODE
---------------------
1. Download the ZIP file.
2. Right-click the ZIP and choose Extract All.
3. Open Visual Studio Code.
4. Select File > Open Folder.
5. Choose the extracted "techorbit-task2-todo" folder.
6. Open index.html.
7. Right-click inside index.html and choose "Open with Live Server".
   If Live Server is not installed, open Extensions in VS Code, search
   for "Live Server", and install it.
8. The application opens in your browser.

ALTERNATIVE RUN METHOD
----------------------
Open the extracted folder and double-click index.html.
It will open directly in your default browser.

HOW TO USE
----------
- Type a task in the input box and click Add task or press Enter.
- Click the tick box to mark a task complete or active.
- Click the pencil icon to edit an active task.
- Click the X icon to delete a task.
- Use All / Active / Completed to filter the list.
- Click Clear completed to remove completed tasks.

IMPORTANT LOCALSTORAGE NOTE
---------------------------
Tasks are stored in the browser on the same device and browser profile.
They remain after refreshing or reopening the page. They are not synced
between devices or different browsers. Clearing browser site data may
remove the saved tasks.

TECHNOLOGIES
------------
HTML5, CSS3, JavaScript (DOM manipulation, events and LocalStorage).

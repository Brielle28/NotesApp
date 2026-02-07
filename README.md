# NotesApp: A Simple Note-Taking Web Application

The **NotesApp** is a lightweight and intuitive note-taking web application built with React. It offers essential features like color-coded categorization, inline editing, and persistent storage using `localStorage`. With its responsive design and minimalistic interface, this app is ideal for quick note management across all devices.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Demo](#demo)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- **Create Notes:** Add new notes with a choice of three customizable color themes for easy categorization.
- **Rich Inline Editing:** Edit the title and content of notes in real time using a rich text editor with bold, italic, underline, lists, and todo checkboxes.
- **Persistent Storage:** Automatically saves notes to `localStorage`, ensuring data is not lost on page reloads.
- **Search & Filter:** Quickly find notes with full-text search and toggle between all notes and pinned favorites.
- **Pinned Notes:** Highlight important notes by pinning them to the top of the list. Pinned notes always appear before others.
- **Flexible Sorting:** Sort notes by **Last edited**, **Created**, **Title**, or **Color**, while still keeping pinned notes at the top.
- **Bulk Actions:** Enter selection mode to select multiple notes at once, then **Pin**, **Unpin**, or **Delete** them in a single action.
- **Delete Notes with Confirmation:** Remove unwanted notes with a custom confirmation modal to prevent accidental deletions.
- **Smart Timestamps:** Each note tracks when it was created and last updated, with human‑friendly relative time labels.
- **Responsive Design:** Optimized for both mobile and desktop devices.
- **Interactive User Interface:** Smooth transitions and hover effects for enhanced usability.
- **Click-to-Edit Functionality:** Quickly switch between viewing and editing mode for each note.

---

## Technologies Used

- [**React**](https://reactjs.org/) - JavaScript library for building user interfaces.
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework for styling.
- [**React Icons**](https://react-icons.github.io/react-icons/) - A library of customizable icons.
- [**Vite**](https://vitejs.dev/) - Fast development server and build tool.

---

## Demo
  https://github.com/user-attachments/assets/1b1ec53d-9079-4cfa-b794-ccc2c4e6d79b

---

## Installation

### Prerequisites
- **Node.js** (v16.x or above)
- **npm** or **yarn**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notes-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd notes-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Usage

1. **Adding a Note:**  
   Click the **"Add New Note"** button and choose a color theme. This creates a new editable note.
   
2. **Editing a Note:**  
   Click on the note content to enable editing mode. Add a title, write content using the rich text toolbar (bold, italic, underline, lists, and todo items), and click the **"Save"** button to save changes.
   
3. **Sorting Notes:**  
   Use the **Sort by** dropdown to change the order of notes between **Last edited**, **Created**, **Title**, and **Color**. Pinned notes will always appear before other notes.

4. **Bulk Selecting Notes:**  
   Click the **Select** button to enter selection mode, then tap notes to select or deselect them. Use the **Pin**, **Unpin**, or **Delete** buttons in the selection bar to apply changes to all selected notes at once.

5. **Deleting a Note:**  
   Click the delete icon (🗑️) in the top-right corner of a note. A confirmation modal will appear to confirm the deletion before the note is removed.

6. **Persistent Storage:**  
   Notes are saved automatically and will remain available even after the page is refreshed or the browser is closed.

---

## Contributing

We welcome contributions to improve **NotesApp**! Here's how you can contribute:

1. **Fork** the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to your branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a **Pull Request** on GitHub.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).  
Feel free to use, modify, and distribute this project as per the terms of the license.

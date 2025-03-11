# ReadingTest - AI 文章自動分詞標註工具

## 1. Project Overview

"ReadingTest" is a React-based web application designed to automatically segment and annotate Chinese text using AI, enhancing the reading experience. It leverages Hugging Face Transformers for part-of-speech (POS) tagging and word segmentation, and an SQLite database for dictionary lookups. The application features a dark/light mode toggle, text input area, and displays both the original and processed text with annotations. This version includes unit tests using Vitest to ensure component functionality and application stability. The project is configured for deployment to GitHub Pages with a specific base URL.

## 2. Project Structure

```
ReadingTest/
├── deploy.sh                 # Deployment script for GitHub Pages
├── eslint.config.js          # ESLint configuration file
├── index.html                # Main HTML file
├── package.json              # Project dependencies and scripts
├── pnpm-lock.yaml            # Dependency lock file for pnpm
├── tailwind.config.js        # Tailwind CSS configuration file
├── tsconfig.json             # TypeScript configuration file
├── vite.config.js            # Vite configuration file
├── public/
│   └── dict-revised.sqlite3  # SQLite database for dictionary lookups
├── readingtool/              # Unused directory
│   └── assets/               # Unused directory
└── src/
    ├── App.css               # Styles for the main App component
    ├── App.jsx               # Main application component
    ├── App.test.jsx          # Unit tests for App component
    ├── index.css             # Global styles, including Tailwind and DaisyUI
    ├── main.jsx              # Entry point for the React application
    ├── assets/               # (Currently empty)
    ├── components/           # React components
    │   ├── DicWordSpan.jsx   # Component to display dictionary definitions for words
    │   ├── DicWordSpan.test.jsx # Unit tests for DicWordSpan component
    │   ├── PosText.jsx       # Component to display part-of-speech tagged text
    │   └── ViewBox.jsx       # Component to display original and processed text
    └── libs/                 # Utility libraries
        ├── AWN.js              # Configuration for Awesome Notifications library
        ├── ChineseTextTools.js # Main logic for text classification
        ├── ChineseTextTools.worker.js # Web worker for text classification
        ├── Dict.worker.js      # Web worker for dictionary lookups
        ├── DictWrapper.js      # Wrapper for the dictionary worker
        └── TagToClass.js       # Utility to map POS tags to CSS classes
    ├── setupTests.js         # Vitest setup file
```

## 3. Key Technologies

*   **React:** JavaScript library for building user interfaces.
*   **Vite:** Build tool for fast development.
*   **Tailwind CSS:** Utility-first CSS framework.
*   **DaisyUI:** Component library on top of Tailwind CSS.
*   **Hugging Face Transformers:** Library for natural language processing tasks.
*   **SQLite WASM:** SQLite compiled to WebAssembly for client-side database access.
*   **Web Workers:** For running computationally intensive tasks in the background.
*   **Awesome Notifications:** For displaying user notifications.
*   **Vitest:** JavaScript Testing Framework

## 4. Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd ReadingTest
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    This will start the application in development mode, typically on `http://localhost:5173`.

4.  **Run the tests:**

    ```bash
    pnpm test
    ```

    This will run the unit tests using Vitest.

## 5. Core Components and Functionality

*   **`src/App.jsx`:**
    *   Manages the overall application state, including dark mode and text input.
    *   Renders the `ViewBox` component and the text input modal.
*   **`src/components/ViewBox.jsx`:**
    *   Displays the original and processed text side-by-side.
    *   Uses `ChineseTextTools.js` to classify the text.
    *   Renders the `PosText` component to display the annotated text.
*   **`src/components/PosText.jsx`:**
    *   Receives the processed text (an array of sentences with POS tags).
    *   Maps each word to a `DicWordSpan` component or a simple `span` based on its length.
    *   Uses `TagToClass.js` to determine the CSS class for each word based on its POS tag.
*   **`src/components/DicWordSpan.jsx`:**
    *   Displays a word with a tooltip containing its dictionary definition.
    *   Uses `DictWrapper.js` to query the dictionary.
*   **`src/libs/ChineseTextTools.js`:**
    *   Initializes and manages the Web Worker (`ChineseTextTools.worker.js`) for text classification.
    *   Provides the `classifyText` function to send text to the worker and receive the processed results.
*   **`src/libs/ChineseTextTools.worker.js`:**
    *   Loads the Hugging Face Transformers models for word segmentation and POS tagging.
    *   Performs the text classification using the loaded models.
    *   Communicates with the main thread using `postMessage`.
*   **`src/libs/DictWrapper.js`:**
    *   Initializes and manages the Web Worker (`Dict.worker.js`) for dictionary lookups.
    *   Provides the `queryDictionary` function to send words to the worker and receive the definitions.
*   **`src/libs/Dict.worker.js`:**
    *   Initializes the SQLite database.
    *   Queries the database for dictionary definitions.
    *   Communicates with the main thread using `postMessage`. The database is now fetched from a subdirectory `/ReadingWSTool/`.
*   **`src/libs/TagToClass.js`:**
    *   Maps POS tags to CSS classes for styling the annotated text.
*   **`src/App.test.jsx`:**
    *   Unit tests for the `App` component, ensuring it renders without crashing.
*   **`src/components/DicWordSpan.test.jsx`:**
    *   Unit tests for the `DicWordSpan` component, verifying word rendering, dictionary query calls, and definition display.
*   **`src/setupTests.js`:**
    *   Vitest setup file, configuring the testing environment for web workers and WASM support.

## 6. Deployment

The `deploy.sh` script automates the build and deployment process to a remote Git Pages branch (typically `gh-pages`).

1.  **Configure the script:**
    *   Modify the `BUILD_DIR`, `GIT_REMOTE`, `GIT_BRANCH`, and `COMMIT_MESSAGE` variables in `deploy.sh` to match your project's configuration.
2.  **Run the script:**

    ```bash
    ./deploy.sh
    ```

    This script will:

    *   Build the Vite project.
    *   Initialize a Git repository in the build directory (`dist`).
    *   Add all files to the staging area.
    *   Commit the changes.
    *   Force-push the changes to the specified Git Pages branch.

## 7. Engineering Tasks and Considerations

*   **Model Optimization:** Explore techniques to optimize the Hugging Face Transformers models for faster loading and processing times. Consider using smaller models or quantization.
*   **Database Optimization:** Optimize the SQLite database for faster query performance. Consider indexing frequently queried columns.
*   **Error Handling:** Implement more robust error handling throughout the application, especially in the Web Workers.
*   **UI/UX Improvements:** Enhance the user interface and user experience. Consider adding features such as:
    *   Customizable annotation styles.
    *   User-defined dictionaries.
    *   More detailed error messages.
*   **Testing:** Implement more unit and integration tests to ensure the application's stability and reliability. Expand existing tests to cover more edge cases and component interactions.
*   **Code Refactoring:** Refactor the code for better readability and maintainability.
*   **Directory `readingtool`:** This directory is currently empty and unused. Determine if it's needed or remove it.
*   **Accessibility:** Ensure the application is accessible to users with disabilities.
*   **Security:** Review the application for potential security vulnerabilities.

## 8. Dependency Notes

*   **`@huggingface/transformers`:** This library is crucial for the AI-powered text processing. Keep an eye on updates and potential performance improvements.
*   **`@sqlite.org/sqlite-wasm`:** This provides the client-side SQLite database. Ensure compatibility with browser environments.
*   **`tailwindcss` and `daisyui`:** These are for styling. Follow their documentation for customization.
*   **`eslint` and related packages:** These are for code quality. Adhere to the linting rules.
*   **`vitest` and related packages:** These are for unit testing. Write comprehensive tests to ensure code quality and prevent regressions.

## 9. Important Notes

*   **Cross-Origin Policies:** The `vite.config.js` includes headers to address Cross-Origin Opener Policy (COOP) and Cross-Origin Embedder Policy (COEP) requirements, which are necessary for using Web Workers with certain features.
*   **Web Workers:** The core logic for text classification and dictionary lookups is handled in Web Workers to prevent blocking the main thread.
*   **Asynchronous Operations:** Be mindful of asynchronous operations when working with Web Workers and Promises.
*   **Model Loading:** The Hugging Face Transformers models are loaded asynchronously in the Web Worker. Ensure that the models are loaded before attempting to classify text.
*   **Error Handling:** Implement proper error handling in the Web Workers to catch and report any errors that may occur during text classification or dictionary lookups.
*   **GitHub Pages Deployment:** The application is configured for deployment to GitHub Pages using a base URL. Ensure that all assets are served from the correct path.

This documentation provides a comprehensive overview of the "ReadingTest" project. By understanding the project structure, key technologies, and engineering tasks, the development team can effectively contribute to the project's ongoing development and maintenance.

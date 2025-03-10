import ViewBox from "./components/ViewBox";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [textInput, setTextInput] = useState(
    "這是一段測試用的文字\n試看看是否可用!",
  );
  const worker = new Worker(new URL("./libs/Dict.worker.js", import.meta.url), {
    type: "module",
  });
  console.log(worker);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const submitHandle = (e) => {
    setTextInput(e.target[0].value);
  };

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
      <dialog
        id="input_text_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <form method="dialog" className="modal-box" onSubmit={submitHandle}>
          <h3 className="font-bold text-lg">請在下面輸入你的文章</h3>
          <p className="py-4">
            按下<kbd className="kbd">ESC</kbd>關閉視窗
          </p>
          <div className="form-control">
            <textarea
              placeholder="請在此輸入文章...."
              className="textarea textarea-md w-full"
              rows="15"
              defaultValue={textInput}
            ></textarea>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              送出
            </button>
            <button className="btn btn-warning">關閉</button>
          </div>
        </form>
      </dialog>
      <div class="navbar shadow-sm bg-gray-300 dark:bg-gray-800">
        <div class="navbar-start"></div>
        <div class="navbar-center">
          <button
            className="btn"
            onClick={() =>
              document.getElementById("input_text_modal").showModal()
            }
          >
            輸入文章內容
          </button>
        </div>
        <div class="navbar-end">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
          >
            {isDarkMode ? (
              <FaSun className="w-6 h-6" />
            ) : (
              <FaMoon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      <ViewBox originalText={textInput} />
    </div>
  );
}

export default App;

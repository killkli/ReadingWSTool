import ViewBox from "./components/ViewBox";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [textInput, setTextInput] = useState(
    `
甲
1968 年霍普創辦月球大使館公司，推出購買月球土地的服務，只要19.99美元 就能買下月球上的一英畝土地。這間位於內華達州的公司宣稱握有好幾個星體的土 地產權。
霍普創立公司時正值失業、離婚，一切都糟透了。當時他想，如果他有土地，狀況或許會好一點。霍普回憶：「接著我看到了月亮，我想著，那裡有好多土地啊。」
於是霍普調查《外太空條約》，發現條約僅明文禁止地球的國家主張其他星球的土地所有權，卻未規範私營公司。在當時，沒人想到會有公司這麼做。於是霍普 飛奔去跑流程，而且從未有任何地球政府挑戰他販賣外太空地產的權限。
——改寫自樂羽嘉〈你真的能買下月球的土地嗎？〉
乙
1969 年美國太空人阿姆斯壯在月球上踏出人類的第一步，在此之前的兩年，聯合國大會才通過《外太空條約》並開放各國簽署，至今已有超過 100 個國家簽署。條約規定必須和平進行太空探索，並造福所有國家。此條約也提到，所有的締約國都不可以主張天體的所有權，並要求締約國不可破壞他國的探測器或基地，例如不能降落在這些物體之上或附近。但這也產生了漏洞，讓國家或私人企業能以先占先贏的手段獨占有利的地點。
2016 年，美國天文物理學家艾維斯在《太空政策》期刊上提到：國家或私人企業都不能主張月球土地的所有權，否則將會引發「瓜分月球」效應，在某些方面就像 1880 年代許多國家開始「瓜分非洲」，在剛果爭相主張礦物資源的所有權一樣。
——改寫自曼恩〈月球土地先占先贏〉
`,
  );

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
      <div className="navbar shadow-sm bg-gray-300 dark:bg-gray-800">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <button
            className="btn"
            onClick={() =>
              document.getElementById("input_text_modal").showModal()
            }
          >
            輸入文章內容
          </button>
        </div>
        <div className="navbar-end">
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

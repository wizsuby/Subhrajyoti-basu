import ArrowDownIcon from "@/components/icons/arrow-down";
import GenerateIcon from "@/components/icons/generate-icon";
import MagicIcon from "@/components/icons/magic";
import RegenerateIcon from "@/components/icons/regenerate-icon";
import Modal from "@/components/Modal";
import { simulateTyping } from "@/lib/utils";
import React, { MouseEvent } from "react";

type Message = {
  sender: "bot" | "user";
  message: string;
};

export default () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<Message[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleMessage = () => {
    if(input === '') return
    setInput('')
    setMessage((prev) => [...prev, { sender: "user", message: input }]);
    setMessage((prev) => [
      ...prev,
      {
        sender: "bot",
        message:
          "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
      },
    ]);
  };

  const insertMessageToInput = () => {
    const inputbox = document.querySelector('.msg-form__contenteditable') as HTMLElement
    closeModal()
    if(!inputbox) return


    const lastBotMessage = message.filter(msg => msg.sender === 'bot').pop()
    if(!lastBotMessage) return 


    simulateTyping(inputbox, lastBotMessage.message)
    
  }
  
  const handleclick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("Clicked Button!!");
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
      id="ai_button"
        onClick={(e) => handleclick(e)}
        className="absolute bg-white shadow-md p-2.5 z-50 flex justify-center items-center h-10 w-10 rounded-full right-2 bottom-2"
      >
        <MagicIcon />
      </button>
      <Modal isOpen={open} onClose={closeModal}>
        <div className="space-y-3">
          {message.length > 0 &&
            message.map((item, index) => {
              return (
                <div key={index} >
                  {item.sender === "user" && (
                    <div  className=" justify-end flex">
                      <div className="bg-[#DFE1E7] px-5 py-3 w-fit rounded-2xl max-w-lg">
                        {item.message}
                      </div>
                    </div>
                  )}
                  {item.sender === "bot" && (
                    <div className=" justify-start flex">
                      <div className="bg-[#DBEAFE] px-5 py-3 w-fit rounded-2xl max-w-lg">
                        {item.message}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <input
          className="border w-full py-3 px-4 rounded-xl mt-5"
          placeholder="Your Prompt"
          onChange={handleChange}
          value={input}
        />
        <div className="flex mt-5 justify-end gap-5">
          {message.length > 0 ? (
            <>
              <button onClick={insertMessageToInput} className="border border-slate-500 font-medium flex items-center gap-3 text-slate-500 px-4 py-3 rounded-lg">
                <ArrowDownIcon className="h-6 w-6" />
                Insert
              </button>
              <button
                className="bg-[#3B82F6] font-medium flex items-center gap-3 text-white px-4 py-3 rounded-lg"
              >
                <RegenerateIcon className="h-6 w-6" />
                Regenerate
              </button>
            </>
          ) : (
            <button
              onClick={handleMessage}
              className="bg-[#3B82F6] font-medium flex items-center gap-3 text-white px-4 py-3 rounded-lg"
            >
              <GenerateIcon className="h-7 w-7" />
              Generate
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

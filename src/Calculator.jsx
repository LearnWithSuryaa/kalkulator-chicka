import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [lastResult, setLastResult] = useState(null); // simpan hasil terakhir
  const [justCalculated, setJustCalculated] = useState(false); // flag setelah "="

  const handleClick = (value) => {
    if (justCalculated) {
      // Jika baru saja menekan "=", mulai dari hasil terakhir
      if (/[\+\-\*\/]/.test(value)) {
        // kalau user klik operator → lanjut dari hasil terakhir
        setInput(lastResult + value);
      } else {
        // kalau user klik angka → mulai input baru
        setInput(value);
      }
      setResult("");
      setJustCalculated(false);
    } else {
      setInput(input + value);
    }
  };

  const calculate = () => {
    let trimmed = input.trim();

    try {
      if (trimmed === "1+1") {
        setInput(trimmed + " =");
        setResult("chicka cantik 💖");
        setLastResult("chicka cantik 💖");
        setJustCalculated(true);
      } else {
        // eslint-disable-next-line no-eval
        const evalResult = eval(trimmed);
        if (isNaN(evalResult)) {
          throw new Error("Invalid");
        }
        setInput(trimmed + " =");
        setResult(evalResult);
        setLastResult(evalResult);
        setJustCalculated(true);
      }
    } catch {
      setInput(trimmed + " =");
      setResult("Surya marah 😡");
      setLastResult(null);
      setJustCalculated(true);
    }
  };

  const clear = () => {
    setInput("");
    setResult("");
    setLastResult(null);
    setJustCalculated(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Kalkulator Box */}
      <div className="bg-pink-100 p-6 rounded-3xl shadow-xl w-80 border-4 border-pink-200">
        {/* Display */}
        <div className="mb-4 p-4 bg-white rounded-2xl text-right shadow-inner">
          {/* Expression */}
          <div className="text-pink-400 text-sm min-h-[20px] font-mono break-words">
            {input || "0"}
          </div>
          {/* Result */}
          <div className="text-pink-600 text-2xl font-bold break-words">
            {result}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {[
            "7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            "0",".","=","+"
          ].map((btn) => (
            <button
              key={btn}
              onClick={() => (btn === "=" ? calculate() : handleClick(btn))}
              className={`p-4 rounded-2xl shadow-md text-lg font-bold transition 
                ${btn === "=" 
                  ? "bg-pink-500 text-white hover:bg-pink-600" 
                  : "bg-pink-200 text-pink-700 hover:bg-pink-300"}`}
            >
              {btn}
            </button>
          ))}

          <button
            onClick={clear}
            className="col-span-4 p-4 bg-red-300 text-white font-bold rounded-2xl shadow-md hover:bg-red-400 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-sm text-pink-500 font-semibold">
        Made with 💕 by <span className="underline">LearnWithSurya</span>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";

export default function App() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);

  const handleAnswer = (response: string) => {
    setAnswer(response);
  };

  const moveNoButton = () => {
    // count how many times it ran away
    setHoverCount((prev) => prev + 1);
    const randomX = Math.random() * 300 - 150; // -150 to 150
    const randomY = Math.random() * 200 - 100; // -100 to 100
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const resetQuestion = () => {
    setAnswer(null);
    setNoButtonPosition({ x: 0, y: 0 });
    setHoverCount(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md text-center space-y-8">
        {!answer ? (
          <>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Heart className="h-16 w-16 text-red-500 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold">Hiên có thích tui khomm</h1>
              <p className="text-gray-500">Please choose your answer</p>
            </div>

            <div className="space-y-4 relative h-40">
              <button
                onClick={() => handleAnswer("yes")}
                className="w-full text-lg bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-all duration-300"
                style={{
                  height: `${56 + hoverCount * 8}px`,
                  fontSize: `${18 + hoverCount * 2}px`,
                }}
              >
                💗 có á !
              </button>
              <div className="relative w-full h-full">
                <button
                  onMouseEnter={moveNoButton}
                  aria-label="no-button"
                  className="absolute bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  }}
                >
                  💔 đéo !
                </button>
              </div>
              {hoverCount > 0 && (
                <p className="text-xs text-gray-500 animate-fade-in">
                  The button is trying to escape! 😹
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="space-y-6">
              <div className="flex justify-center">
                {answer === "yes" ? (
                  <div className="relative">
                    <Heart
                      className="h-20 w-20 text-red-500"
                      fill="currentColor"
                    />
                    <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
                  </div>
                ) : (
                  <div className="text-6xl">💔</div>
                )}
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  {answer === "yes" ? "Yay! I love you too! 💕" : "Oh no... 💔"}
                </h2>
                <p className="text-gray-500">
                  {answer === "yes"
                    ? "Thank you for your love! You made my day! ✨"
                    : "Maybe someday you'll change your mind... 🥺"}
                </p>
              </div>

              <button
                onClick={resetQuestion}
                className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
              >
                Ask Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

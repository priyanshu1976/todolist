import React, { useState, useEffect } from "react";
import anime from "animejs";

const AnimatedText = ({ sentences }) => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const textRef = React.useRef(null);

  useEffect(() => {
    const animateText = () => {
      anime
        .timeline({ loop: false })
        .add({
          targets: textRef.current,
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: 500,
        })
        .add({
          targets: textRef.current,
          opacity: [1, 0],
          easing: "easeInOutQuad",
          duration: 500,
          delay: 2000, // Delay before animating next sentence
          complete: () => {
            setCurrentSentence((prev) => (prev + 1) % sentences.length); // Move to next sentence
          },
        });
    };

    animateText();
  }, [currentSentence, sentences.length]);

  return (
    <div className="ml9">
      <div className="text-wrapper">
        <span ref={textRef} className="letters">
          {sentences[currentSentence]}
        </span>
      </div>
    </div>
  );
};

export default AnimatedText;

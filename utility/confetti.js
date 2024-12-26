import confetti from "canvas-confetti";

export const Confetti = () =>
{
    
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
 
    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min;
 
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
 
    if (timeLeft <= 0) 
    {
        return clearInterval(interval);
    }
 
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
}
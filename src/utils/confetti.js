import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B']
    });
  } catch (e) {
    console.log('Confetti triggered', e);
  }
};

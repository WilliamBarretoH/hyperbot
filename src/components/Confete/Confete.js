import { useEffect } from 'react';

const ConfettiEffect = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.napoleon.com.br/codigos/confetti.min.js';
    
    const cleanup = () => {
      if (window.confetti) {
        window.confetti.stop();
        window.confetti.remove();
      }
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };

    script.onload = () => {
      if (window.confetti) {
        window.confetti.start();
        // Força parada após 3 segundos mesmo se componente desmontar
        setTimeout(() => {
          window.confetti.stop();
          window.confetti.remove();
        }, 3000);
      }
    };

    document.body.appendChild(script);

    return cleanup;
  }, []);

  return null;
};

export default ConfettiEffect;
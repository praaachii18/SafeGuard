import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SOSButton() {
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();

  const handleSOSClick = () => {
    setIsPressed(true);
    // Navigate to SOS page
    navigate('/sos');
    // Reset button state after animation
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <button
      onClick={handleSOSClick}
      className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center font-bold text-sm ${
        isPressed ? 'scale-95' : 'scale-100'
      } animate-pulse`}
      aria-label="Emergency SOS"
    >
      SOS
    </button>
  );
}

export default SOSButton;
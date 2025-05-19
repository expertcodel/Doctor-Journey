import { useEffect } from 'react';

const LazyYoutube = ({ videoId, isOpen, setIsOpen }) => {
  // Lock scroll and close on ESC key

  const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  position: 'relative',
  width: '90%',
  maxWidth: '960px',
  aspectRatio: '16 / 9',
  backgroundColor: '#000',
  boxShadow: '0 0 20px rgba(0,0,0,0.5)',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '15px',
  fontSize: '2rem',
  color: '#fff',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  zIndex: 2,
};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={() => setIsOpen(false)}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={() => setIsOpen(false)}>&times;</button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default LazyYoutube;

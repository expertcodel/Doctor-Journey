import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'next/navigation';
const LazyYoutube = ({ videoId, isOpen, setIsOpen, setViews }) => {
  // Lock scroll and close on ESC key
  const { user } = useAuth();
  const playerRef = useRef(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const { id } = useParams();


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

  const hasRun = useRef(false);
  useEffect(() => {

    const incrementCount = async () => {

      if (hasRun.current) return;
      hasRun.current = true;

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos`, {
        method: 'PATCH',
        body: JSON.stringify({ videoId: id }),
      });

      const res = await response.json();
      if (res.status) {
        setViews(res.views);
        console.log(res.views,"views");
        
      }
    };

    incrementCount();

  }, [])


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

  // Load YouTube IFrame API
  useEffect(() => {
    if (!isOpen) return;

    const loadPlayer = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        videoId,
        events: {
          onStateChange: (event) => {
            if (event.data === 0) {
              // Video ended
              if (!user) {
                setIsVideoEnded(true);
              }

            }
          },
        },
        playerVars: {
          autoplay: 1,
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = loadPlayer;
      document.body.appendChild(tag);
    } else {
      loadPlayer();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [isOpen, videoId]);

  if (!isOpen) return null;

  return (
    <>
      <div style={overlayStyle} onClick={() => setIsOpen(false)}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <button style={closeButtonStyle} onClick={() => setIsOpen(false)}>&times;</button>
          {/* <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe> */}
          <div id="yt-player" style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>

      {isVideoEnded && (
        <div style={{ ...overlayStyle, backgroundColor: 'rgba(0,0,0,0.95)' }}>
          <div style={{ background: '#111', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <button style={closeButtonStyle} onClick={() => setIsVideoEnded(false)}>&times;</button>
            <h2 className="text-white mb-3">Want to unlock the full video?</h2>
            <p className="text-white mb-3">Create your free account now and enjoy unrestricted access to all our premium content!</p>
            <Link className="btn btn-danger" href="/register">
              Register Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default LazyYoutube;

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, AlertCircle } from 'lucide-react';

const FaceCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);

  const startCamera = async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access failed:', err);
      setError('Please allow camera access to take a profile picture.');
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 350);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    // Mirror the image to match the front-facing preview
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedImage(imageUrl);
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const confirmPhoto = () => {
    onCapture(capturedImage);
    onClose();
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center overflow-hidden">
      
      {/* Top Navbar matching screenshot */}
      <div className="absolute top-0 w-full z-30 bg-white">
        <div className="px-5 py-4 flex items-center">
          <button onClick={handleClose} className="p-2 -ml-2 active:scale-95 transition">
            <ChevronLeft className="w-8 h-8 text-black" strokeWidth={2.5} />
          </button>
          <h1 className="text-[22px] font-medium text-black ml-2">
            Take your photo
          </h1>
        </div>
        {/* Blue Progress Bar */}
        <div className="w-full h-1 bg-gray-200">
          <div className="h-full bg-[#007FFF] w-[40%]" />
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 w-full relative flex flex-col items-center overflow-hidden">
        
        {/* Error State */}
        {error && (
          <div className="flex-1 px-8 text-center flex flex-col items-center justify-center z-20 pt-20">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-[22px] mb-8 font-medium leading-relaxed text-black">{error}</p>
            <button 
              onClick={startCamera}
              className="bg-[#007FFF] text-white px-8 py-4 rounded-full text-[20px] font-bold active:scale-95 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Camera Output Container */}
        {!error && (
          <>
            {/* The underlying video or captured image */}
            {!capturedImage ? (
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted 
                className="absolute w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <img 
                src={capturedImage} 
                alt="Captured profile preview" 
                className="absolute w-full h-full object-cover" 
              />
            )}

            {/* Layout Overlays matching the screenshot precisely */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center pt-[18vh] z-10">
              
               {/* 1. The frosted/white square cutout mask */}
               <div className="w-[82vw] max-w-[340px] aspect-square relative shadow-[0_0_0_9999px_rgba(242,244,245,0.85)]">
                   
                   {/* 2. The Face Silhouette SVG inside the transparent cutout */}
                   {!capturedImage && (
                     <svg className="absolute inset-x-0 -bottom-4 w-full h-[115%] text-white drop-shadow-md" viewBox="0 0 100 100">
                         <g transform="translate(50, 50) scale(0.9) translate(-50, -50)">
                           {/* Head outline */}
                           <ellipse cx="50" cy="50" rx="36" ry="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
                           {/* Ears */}
                           <path d="M 14 46 C 8 46, 8 58, 14 58" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                           <path d="M 86 46 C 92 46, 92 58, 86 58" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                           {/* Eyebrows */}
                           <path d="M 28 35 Q 36 32 43 36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                           <path d="M 72 35 Q 64 32 57 36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                           {/* Eyes */}
                           <ellipse cx="36" cy="42" rx="4.5" ry="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                           <path d="M 36 40.5 L 36 43.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                           
                           <ellipse cx="64" cy="42" rx="4.5" ry="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                           <path d="M 64 40.5 L 64 43.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                           {/* Nose */}
                           <path d="M 50 43 L 50 56 Q 50 60 53 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                           {/* Mouth */}
                           <path d="M 39 68 Q 50 74 61 68" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                         </g>
                     </svg>
                   )}
               </div>
               
               {/* 3. The Tips Pill Button */}
               {!capturedImage && (
                 <button className="mt-6 px-10 py-2.5 rounded-[40px] border border-[#007FFF] text-[#007FFF] text-[18px] font-medium active:bg-blue-50 transition pointer-events-auto bg-transparent">
                     Tips
                 </button>
               )}
            </div>

            {/* Flash Overlay */}
            {isFlashing && (
               <div className="absolute inset-0 bg-white z-[60] animate-flash pointer-events-none" />
            )}
          </>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Footer Controls */}
      <div className="w-full flex justify-center items-center z-40 absolute bottom-[5%]">
        {!error && !capturedImage && (
          /* Solid Blue Circle Shutter inside a thin ring */
          <button 
            onClick={takePhoto}
            className="w-[78px] h-[78px] rounded-full border-2 border-[#007FFF] p-[5px] flex items-center justify-center active:scale-95 transition-transform bg-transparent"
          >
            <div className="w-full h-full rounded-full bg-[#007FFF]" />
          </button>
        )}

        {!error && capturedImage && (
          <div className="w-full flex justify-between items-center px-12 h-[80px]">
             <button 
              onClick={retakePhoto}
              className="px-6 py-3 rounded-[30px] border-2 border-[#007FFF] text-[#007FFF] text-[18px] font-bold active:scale-95 transition bg-white/60 backdrop-blur-md"
             >
               Retake
             </button>

             <button 
              onClick={confirmPhoto}
              className="px-8 py-3 rounded-[30px] bg-[#007FFF] text-white text-[18px] font-bold shadow-lg active:scale-95 transition"
             >
               Confirm
             </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default FaceCapture;

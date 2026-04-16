import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  IdCard, 
  User, 
  Car, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  MessageSquare, 
  Home, 
  UserCircle,
  Camera
} from 'lucide-react';
import FaceCapture from './components/FaceCapture';

const ListMenuRow = ({ icon: Icon, text, subtext, isLast, isWarning }) => (
  <button className="w-full text-left flex bg-white hover:bg-gray-50 active:bg-blue-50/50 transition duration-150 group">
    {/* Left Icon Block */}
    <div className="pl-5 pt-4 pb-4 shrink-0 flex items-center">
      <div className={`w-[56px] h-[56px] rounded-full flex items-center justify-center ${isWarning ? 'bg-red-50' : 'bg-[#E8F3FF]'}`}>
        <Icon className={`w-8 h-8 ${isWarning ? 'text-red-500' : 'text-[#007FFF]'}`} strokeWidth={2.5} />
      </div>
    </div>
    
    {/* Right Content Block with Border */}
    <div className={`flex-1 pr-6 py-5 ml-4 flex justify-between items-center ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="flex flex-col">
        <span className={`text-[20px] font-bold tracking-wide ${isWarning ? 'text-red-600' : 'text-gray-900'}`}>{text}</span>
        {subtext && <span className="text-gray-500 text-[15px] font-medium mt-1">{subtext}</span>}
      </div>
      {!isWarning && <ChevronRight className="w-7 h-7 text-gray-300" strokeWidth={2.5} />}
    </div>
  </button>
);

const NavIcon = ({ icon: Icon, text, active }) => (
  <button className="flex flex-col items-center justify-center py-2 px-6 transition-all rounded-3xl group">
    <div className={`mb-1 p-2 rounded-2xl ${active ? 'bg-[#E8F3FF]' : ''}`}>
      <Icon className={`w-8 h-8 ${active ? 'text-[#007FFF] drop-shadow-sm' : 'text-gray-400 group-hover:text-gray-600'}`} strokeWidth={active ? 2.5 : 2} />
    </div>
    <span className={`text-[15px] font-bold tracking-wide ${active ? 'text-[#007FFF]' : 'text-gray-500'}`}>{text}</span>
  </button>
);

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80');

  return (
    <div className="h-screen bg-gray-50 flex justify-center text-gray-900 font-sans selection:bg-[#E8F3FF] overflow-hidden">
      <div className="w-full max-w-md flex flex-col h-full relative shadow-[0_0_40px_rgba(0,0,0,0.05)] bg-[#F8FAFC]">
        
        {/* Main Scrollable Area */}
        <div className="flex-1 overflow-y-auto pb-8 relative">
          
          {/* Top Navbar */}
          <div className="sticky top-0 z-10 bg-[#F8FAFC]/90 backdrop-blur-md px-6 pt-12 pb-3 flex items-center justify-center border-b border-gray-200/50">
            <button className="absolute left-6 text-gray-800 flex items-center w-10 h-10 justify-center active:scale-90 transition-transform">
              <ChevronLeft className="w-8 h-8" strokeWidth={2.5} />
            </button>
            <h1 className="text-[20px] font-bold text-gray-900 tracking-wide">Profile</h1>
          </div>

          {/* User Header */}
          <div className="pt-8 pb-4 flex flex-col items-center">
            <div className="relative">
              <button 
                onClick={() => setIsCameraOpen(true)}
                className="relative block rounded-full focus:outline-none active:scale-95 transition group mb-3"
              >
                <img 
                  src={profileImage} 
                  alt="Driver profile picture" 
                  className="w-[120px] h-[120px] object-cover rounded-full shadow-sm border-[4px] border-white z-0 bg-gray-200"
                />
                
                {/* Camera icon overlay prompt on hover */}
                <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-10 h-10 text-white mb-1" />
                </div>
              </button>
              
              {/* Blue Camera Badge */}
              <div className="absolute bottom-5 right-0 bg-[#007FFF] w-9 h-9 border-[3px] border-white rounded-full shadow-sm flex items-center justify-center pointer-events-none">
                 <Camera className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
            <h2 className="text-[28px] font-extrabold text-gray-900 tracking-wide mt-1">James Smith</h2>
            
            <div className="text-[16px] font-semibold text-gray-400 mt-2 tracking-wide">
              Sydney Fleet Co. · <span className="text-gray-400">ID: DRV-88294</span>
            </div>
          </div>

          {/* Section 1: Profile Details */}
          <div className="px-5 mt-4">
            <h3 className="text-[17px] font-bold text-gray-500 mb-3 px-3 tracking-wide uppercase">Profile Details</h3>
            <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">
              <ListMenuRow icon={IdCard} text="Driver Licence" subtext="Update & expiry status" />
              <ListMenuRow icon={User} text="Personal Details" subtext="Contact information" />
              <ListMenuRow icon={Car} text="Vehicle Details" subtext="Rego & inspection records" />
              <ListMenuRow icon={ShieldCheck} text="Insurance Details" subtext="Coverage & policy status" isLast />
            </div>
          </div>

          {/* Section 2: System & Security */}
          <div className="px-5 mt-6 mb-10">
            <h3 className="text-[17px] font-bold text-gray-500 mb-3 px-3 tracking-wide uppercase">System & Security</h3>
            <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden mb-8">
              <ListMenuRow icon={Settings} text="App Settings" subtext="Display & notifications" />
              <ListMenuRow icon={LogOut} text="Sign Out" subtext="Securely log out" isWarning isLast />
            </div>
          </div>
          
        </div>

        {/* Bottom Navigation */}
        <div className="w-full bg-white/95 backdrop-blur-xl border-t border-gray-200/60 pb-8 pt-3 px-4 flex justify-around items-center z-50">
          <NavIcon icon={MessageSquare} text="Messages" active={false} />
          <NavIcon icon={Home} text="Home" active={false} />
          <NavIcon icon={UserCircle} text="Profile" active={true} />
        </div>

      </div>

      {/* Face Capture Overlay */}
      {isCameraOpen && (
        <FaceCapture 
          onClose={() => setIsCameraOpen(false)}
          onCapture={(imgUrl) => {
            setProfileImage(imgUrl);
          }}
        />
      )}
    </div>
  );
}

export default App;

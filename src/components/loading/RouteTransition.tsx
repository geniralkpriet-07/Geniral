import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import LightRays from './LightRays';
import './transitions.css';

interface RouteTransitionContextProps {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
}

const RouteTransitionContext = createContext<RouteTransitionContextProps>({
  isTransitioning: false,
  startTransition: () => {},
  endTransition: () => {},
});

export const useRouteTransition = () => useContext(RouteTransitionContext);

interface RouteTransitionProviderProps {
  children: React.ReactNode;
}

export const RouteTransitionProvider: React.FC<RouteTransitionProviderProps> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== 'POP') {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Duration of transition animation
      
      return () => clearTimeout(timer);
    }
  }, [location, navigationType]);

  const startTransition = () => setIsTransitioning(true);
  const endTransition = () => setIsTransitioning(false);

  return (
    <RouteTransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
      {children}
      {isTransitioning && <RouteTransitionOverlay />}
    </RouteTransitionContext.Provider>
  );
};

const RouteTransitionOverlay: React.FC = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a18] bg-opacity-90 transition-opacity duration-300">
      <div className="relative w-full max-w-md mx-auto">
        <div className="absolute inset-0">
          <LightRays
            raysColor="#8080ff"
            raysSpeed={1.2}
            lightSpread={1.5}
            rayLength={2}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.06}
            distortion={0.04}
            pulsating={true}
            fadeDistance={1.5}
            saturation={0.6}
          />
        </div>
        
        <div className="relative z-10 text-center">
          <div className="text-white text-2xl font-bold mb-4">Loading...</div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteTransitionProvider;

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LightRays } from '.'
import genniralLogo from '../../assets/logo.png'

function LoadComponent() {
  const navigate = useNavigate()
  const [logoOpacity, setLogoOpacity] = useState(0)
  const [blurAmount, setBlurAmount] = useState(5)
  const [taglineVisible, setTaglineVisible] = useState(false)
  const [indicatorProgress, setIndicatorProgress] = useState(0)

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLogoOpacity(1)
    }, 300)

    const taglineTimer = setTimeout(() => {
      setTaglineVisible(true)
    }, 1200)

    const indicatorInterval = setInterval(() => {
      setIndicatorProgress(prev => (prev + 1) % 4)
    }, 500)

    const blurTimer = setInterval(() => {
      setBlurAmount(prev => (prev === 0 ? 5 : 0))
    }, 1000)

    const navigationTimer = setTimeout(() => {
      navigate('/')
    }, 4000)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(taglineTimer)
      clearInterval(indicatorInterval)
      clearInterval(blurTimer)
      clearTimeout(navigationTimer)
    }
  }, [navigate])

  const renderLoadingIndicator = () => {
    return (
      <div className="loading-dots">
        {[0, 1, 2, 3].map(index => (
          <div 
            key={index} 
            className="dot"
            style={{
              opacity: index <= indicatorProgress ? 1 : 0.3,
              transform: index <= indicatorProgress ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="background-rays-container">
          <LightRays
            raysColor="#ffffff"
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
            className="background-rays"
          />
        </div>
        
        {taglineVisible && (
          <div className="top-tagline-container">
            <div className="organization">STUDENTS ASSOCIATION</div>
            <div className="kpriet">KPRIET</div>
          </div>
        )}
        
        <div className="content-container">
          <div className="logo-container">
            <img 
              src={genniralLogo} 
              alt="Genniral Logo" 
              style={{ 
                maxWidth: '450px', 
                width: '70%',
                opacity: logoOpacity,
                transition: 'filter 0.5s ease-in-out',
                animation: 'logoPulse 3s infinite ease-in-out',
                filter: `blur(${blurAmount}px)` 
              }} 
            />
          </div>
          
          {taglineVisible && (
            <div className="tagline-container">
              <div className="department">Department of CSE</div>
              {renderLoadingIndicator()}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .loading-screen {
          background: radial-gradient(circle at center, #111133 0%, #0a0a18 70%, #050510 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: white;
        }
        
        .loading-container {
          position: relative;
          overflow: hidden;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .background-rays-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .content-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          z-index: 1;
          pointer-events: none;
        }
        
        .top-tagline-container {
          position: absolute;
          top: 15%;
          left: 0;
          width: 100%;
          text-align: center;
          animation: fadeInDown 1s forwards;
          z-index: 2;
        }
        
        .logo-container {
          margin-bottom: 30px;
          position: relative;
          background: transparent;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        
        .tagline-container {
          text-align: center;
          animation: fadeInUp 1s forwards;
          margin-top: 20px;
        }
        
        .organization {
          font-size: 1.5rem;
          letter-spacing: 4px;
          font-weight: 600;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
        }
        
        .kpriet {
          font-size: 2rem;
          letter-spacing: 6px;
          font-weight: 700;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
        }
        
        .department {
          font-size: 1.4rem;
          letter-spacing: 2px;
          font-weight: 300;
          margin-bottom: 25px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
        }
        
        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 10px;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
        }
        
        @keyframes logoPulse {
          0% { opacity: ${logoOpacity}; }
          50% { opacity: ${Math.max(0.7, logoOpacity - 0.3)}; }
          100% { opacity: ${logoOpacity}; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default LoadComponent

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import { LightRays } from '../../components/loading'
// Using public path with type declaration support
import genniralLogo from '/logo.png'

function LoadingScreen() {
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
    }, 500)

    const indicatorInterval = setInterval(() => {
      setIndicatorProgress(prev => (prev + 1) % 4)
    }, 500)

    const blurTimer = setInterval(() => {
      setBlurAmount(prev => (prev === 0 ? 5 : 0))
    }, 1000)

    const navigationTimer = setTimeout(() => {
      navigate('/')
    }, 5000) 

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
      <div className="loading-dots" style={{ animation: 'fadeInUp 0.5s 0.6s forwards', opacity: 0, animationFillMode: 'forwards' }}>
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
            raysOrigin="top-center"
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
        
        <div className="content-wrapper">
          {taglineVisible && (
            <div className="top-tagline-container">
              <div className="organization" style={{ animation: 'fadeInDown 0.5s forwards' }}>STUDENTS ASSOCIATION</div>
              <div className="kpriet" style={{ animation: 'fadeInDown 0.5s 0.2s forwards', opacity: 0, animationFillMode: 'forwards' }}>KPRIET</div>
            </div>
          )}
          
          <div className="logo-container">
            <img 
              src={genniralLogo} 
              alt="Genniral Logo" 
              className="logo-image"
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
              <div className="department" style={{ animation: 'fadeInUp 0.5s 0.4s forwards', opacity: 0, animationFillMode: 'forwards' }}>Department of CSE</div>
              {renderLoadingIndicator()}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .loading-screen {
          background: radial-gradient(circle at center, #111133 0%, #0a0a18 70%, #050510 100%);
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          color: white;
          overflow: hidden;
        }
        
        .loading-container {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
          box-sizing: border-box;
        }
        
        .content-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          z-index: 1;
          padding: 0 20px;
          box-sizing: border-box;
        }
        
        .background-rays-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .top-tagline-container {
          margin-bottom: min(15vh, 120px);
          text-align: center;
          animation: fadeInDown 1s forwards;
          width: 100%;
        }
        
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          background: transparent;
        }
        
        .logo-image {
          width: 70%;
          max-width: 450px;
          min-width: 200px;
          height: auto;
          object-fit: contain;
        }
        
        .tagline-container {
          text-align: center;
          animation: fadeInUp 1s forwards;
          margin-top: min(15vh, 80px);
          width: 100%;
        }
        
        .organization {
          font-size: clamp(1rem, 5vw, 1.5rem);
          letter-spacing: 3px;
          font-weight: 600;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
        }
        
        .kpriet {
          font-size: clamp(1.5rem, 6vw, 2rem);
          letter-spacing: 4px;
          font-weight: 700;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
        }
        
        .department {
          font-size: clamp(1rem, 5vw, 1.4rem);
          letter-spacing: 2px;
          font-weight: 300;
          margin-bottom: 25px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
        }
        
        .loading-dots {
          display: flex;
          justify-content: center;
          gap: clamp(8px, 2vw, 12px);
          margin-top: 10px;
        }
        
        .dot {
          width: clamp(6px, 1.5vw, 8px);
          height: clamp(6px, 1.5vw, 8px);
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
        
        @media screen and (max-width: 768px) {
          .top-tagline-container {
            margin-bottom: min(10vh, 80px);
          }
          
          .tagline-container {
            margin-top: min(10vh, 60px);
          }
        }
        
        @media screen and (max-width: 480px) {
          .top-tagline-container {
            margin-bottom: min(8vh, 60px);
          }
          
          .tagline-container {
            margin-top: min(8vh, 40px);
          }
          
          .logo-image {
            width: 85%;
            min-width: 150px;
          }
        }
        
        @media screen and (max-height: 600px) {
          .top-tagline-container {
            margin-bottom: 40px;
          }
          
          .tagline-container {
            margin-top: 30px;
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen

import { LightRays } from '../../components/loading'

function HomePage() {
  return (
    <div style={{ 
      backgroundColor: '#0a0a18', 
      minHeight: '100vh', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.05}
          distortion={0.03}
          pulsating={true}
          fadeDistance={1.2}
          saturation={0.5}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Welcome to KPRIET Students Association</h1>
      </div>
    </div>
  )
}

export default HomePage

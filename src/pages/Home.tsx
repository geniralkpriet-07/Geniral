import { LightRays } from "../components/loading"
import "../index.css"
function HomePage() {
  return (
    <div className="min-h-screen text-white bg-[#0a0a18] [background:radial-gradient(circle_at_center,_#111133_0%,_#0a0a18_70%,_#050510_100%)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <LightRays
            raysColor="#8080ff"
            raysSpeed={0.8}
            lightSpread={1.5}
            rayLength={2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.06}
            distortion={0.04}
            pulsating={true}
            fadeDistance={1.5}
            saturation={0.6}
          />
        </div>

        <div className="relative z-10 max-w-3xl w-full text-center pt-16 md:pt-24">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 text-sm font-medium text-center border border-white/15 shadow-[0_0_15px_rgba(128,128,255,0.1)]">
            <span role="img" aria-label="star">
              ⭐
            </span>{" "}
            KPR Institute of Engineering and Technology
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight text-center text-balance">
            <div>
              Department of{" "}
              <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
                Computer Science
              </span>
            </div>
            <div>
              Student{" "}
              <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
                Association
              </span>
            </div>
          </h1>

          <p className="text-xl max-w-xl mx-auto mb-12 text-white/80">
            Fostering innovation, collaboration, and technical excellence among the future leaders of technology
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="#explore"
              className="inline-block px-6 py-3 rounded-full font-medium transition-all bg-[rgba(128,128,255,0.3)] text-white border border-[rgba(128,128,255,0.6)] shadow-[0_0_15px_rgba(128,128,255,0.3)] backdrop-blur-sm hover:bg-[rgba(128,128,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(128,128,255,0.4)]"
            >
              Explore Events
            </a>
            <a
              href="#join"
              className="inline-block px-6 py-3 rounded-full font-medium transition-all bg-white/5 text-white/90 border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              Join Association
            </a>
          </div>
        </div>
      </section>

      {/* Announcement Ticker */}
      <section className="py-3 bg-[rgba(0,0,30,0.5)] border-t border-b border-[rgba(128,128,255,0.2)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center overflow-hidden">
            <div className="flex-shrink-0 bg-[rgba(128,128,255,0.3)] px-4 py-1 rounded mr-4 font-medium text-sm">
              Latest Updates
            </div>
            <div className="overflow-hidden whitespace-nowrap">
              <p className="inline-block pr-12 m-0 text-white/90">
                Registration for Hackathon 2025 now open! &nbsp;•&nbsp; Technical Workshop on AI/ML on Sept 15
                &nbsp;•&nbsp; Campus recruitment drive by TechCorp on Sept 20
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20" id="explore">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Upcoming{" "}
            <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">Events</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Event card 1 */}
            <div className="relative bg-[rgba(20,20,50,0.5)] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform transition-shadow duration-300 border border-[rgba(128,128,255,0.1)] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
              <div className="absolute top-4 left-4 bg-[rgba(128,128,255,0.3)] backdrop-blur-sm p-2 rounded flex flex-col items-center justify-center z-10 border border-[rgba(128,128,255,0.2)]">
                <span className="text-[0.75rem] font-semibold uppercase">SEP</span>
                <span className="text-xl font-bold">15</span>
              </div>
              <div className="h-44 relative">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
                  alt="AI/ML Workshop"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[rgba(10,10,30,0.9)]" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">AI/ML Workshop</h3>
                <p className="text-white/70 text-sm mb-4 leading-6">
                  Hands-on session on implementing machine learning algorithms using Python and TensorFlow.
                </p>
                <div className="flex justify-between text-[0.8rem] text-white/60 mb-4">
                  <span>CSE Seminar Hall</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <a
                  href="#register"
                  className="inline-block bg-[rgba(128,128,255,0.2)] text-white px-4 py-2 rounded text-sm font-medium transition-colors border border-[rgba(128,128,255,0.3)] hover:bg-[rgba(128,128,255,0.3)]"
                >
                  Register Now
                </a>
              </div>
            </div>

            {/* Event card 2 */}
            <div className="relative bg-[rgba(20,20,50,0.5)] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform transition-shadow duration-300 border border-[rgba(128,128,255,0.1)] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
              <div className="absolute top-4 left-4 bg-[rgba(128,128,255,0.3)] backdrop-blur-sm p-2 rounded flex flex-col items-center justify-center z-10 border border-[rgba(128,128,255,0.2)]">
                <span className="text-[0.75rem] font-semibold uppercase">SEP</span>
                <span className="text-xl font-bold">20</span>
              </div>
              <div className="h-44 relative">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095"
                  alt="Campus Recruitment"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[rgba(10,10,30,0.9)]" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">TechCorp Recruitment</h3>
                <p className="text-white/70 text-sm mb-4 leading-6">
                  On-campus recruitment drive for final year students. Opportunities for internships and full-time
                  positions.
                </p>
                <div className="flex justify-between text-[0.8rem] text-white/60 mb-4">
                  <span>Main Auditorium</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <a
                  href="#register"
                  className="inline-block bg-[rgba(128,128,255,0.2)] text-white px-4 py-2 rounded text-sm font-medium transition-colors border border-[rgba(128,128,255,0.3)] hover:bg-[rgba(128,128,255,0.3)]"
                >
                  Register Now
                </a>
              </div>
            </div>

            {/* Event card 3 */}
            <div className="relative bg-[rgba(20,20,50,0.5)] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform transition-shadow duration-300 border border-[rgba(128,128,255,0.1)] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
              <div className="absolute top-4 left-4 bg-[rgba(128,128,255,0.3)] backdrop-blur-sm p-2 rounded flex flex-col items-center justify-center z-10 border border-[rgba(128,128,255,0.2)]">
                <span className="text-[0.75rem] font-semibold uppercase">OCT</span>
                <span className="text-xl font-bold">05</span>
              </div>
              <div className="h-44 relative">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                  alt="Hackathon 2025"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[rgba(10,10,30,0.9)]" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Hackathon 2025</h3>
                <p className="text-white/70 text-sm mb-4 leading-6">
                  24-hour coding challenge to solve real-world problems. Exciting prizes and networking opportunities.
                </p>
                <div className="flex justify-between text-[0.8rem] text-white/60 mb-4">
                  <span>CSE Labs</span>
                  <span>Starts at 10:00 AM</span>
                </div>
                <a
                  href="#register"
                  className="inline-block bg-[rgba(128,128,255,0.2)] text-white px-4 py-2 rounded text-sm font-medium transition-colors border border-[rgba(128,128,255,0.3)] hover:bg-[rgba(128,128,255,0.3)]"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/events"
              className="inline-block bg-white/5 text-white/90 px-6 py-3 rounded-full font-medium border border-white/10 transition-all hover:bg-white/10 hover:-translate-y-0.5"
            >
              View All Events
            </a>
          </div>
        </div>
      </section>

      {/* Department Highlights */}
      <section className="py-20 bg-[rgba(15,15,40,0.5)] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12">
            Department{" "}
            <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
              Highlights
            </span>
          </h2>

          <div className="flex justify-around flex-wrap gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent inline-block mb-2">
                500+
              </div>
              <div className="text-base text-white/70 uppercase tracking-wide">Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent inline-block mb-2">
                25+
              </div>
              <div className="text-base text-white/70 uppercase tracking-wide">Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent inline-block mb-2">
                95%
              </div>
              <div className="text-base text-white/70 uppercase tracking-wide">Placement</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent inline-block mb-2">
                50+
              </div>
              <div className="text-base text-white/70 uppercase tracking-wide">Publications</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            CLUBS OF{" "}
            <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">GENNIRAL</span>
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-[1.1rem] text-white/80 leading-7">
            Our vibrant student association hosts several specialized clubs that nurture talent, skills, and interests
            across different domains. Each club is run by passionate students and guided by faculty mentors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Club card 1 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] text-center transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-[rgba(128,128,255,0.3)]">
              <div className="w-20 h-20 bg-[rgba(128,128,255,0.15)] rounded-full flex items-center justify-center mx-auto mb-6 text-white/90 transition-all duration-300 border border-[rgba(128,128,255,0.3)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-[1.3rem] font-bold mb-4 bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
                TECH PATRONS
              </h3>
              <p className="text-[0.95rem] text-white/80 leading-7 mb-6 flex-grow">
                Leading technological innovation on campus, Tech Patrons organize coding competitions, hackathons, and
                technical workshops to enhance students' programming and development skills.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Coding Competitions
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Tech Workshops
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Project Mentoring
                </span>
              </div>
            </div>

            {/* Club card 2 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] text-center transition-all duration-300 h-full flex flex-direction-col flex-col hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-[rgba(128,128,255,0.3)]">
              <div className="w-20 h-20 bg-[rgba(128,128,255,0.15)] rounded-full flex items-center justify-center mx-auto mb-6 text-white/90 transition-all duration-300 border border-[rgba(128,128,255,0.3)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-[1.3rem] font-bold mb-4 bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
                SPEAKZY
              </h3>
              <p className="text-[0.95rem] text-white/80 leading-7 mb-6 flex-grow">
                Focused on developing communication and public speaking skills, Speakzy hosts debates, group
                discussions, and language improvement sessions to prepare students for professional environments.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Debates
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Public Speaking
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Group Discussions
                </span>
              </div>
            </div>

            {/* Club card 3 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] text-center transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-[rgba(128,128,255,0.3)]">
              <div className="w-20 h-20 bg-[rgba(128,128,255,0.15)] rounded-full flex items-center justify-center mx-auto mb-6 text-white/90 transition-all duration-300 border border-[rgba(128,128,255,0.3)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-[1.3rem] font-bold mb-4 bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
                ECO/ISR
              </h3>
              <p className="text-[0.95rem] text-white/80 leading-7 mb-6 flex-grow">
                Promoting environmental awareness and social responsibility, ECO/ISR organizes campus clean-ups,
                awareness campaigns, and sustainable technology projects for a better tomorrow.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Green Initiatives
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Social Outreach
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Sustainability Projects
                </span>
              </div>
            </div>

            {/* Club card 4 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] text-center transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-[rgba(128,128,255,0.3)]">
              <div className="w-20 h-20 bg-[rgba(128,128,255,0.15)] rounded-full flex items-center justify-center mx-auto mb-6 text-white/90 transition-all duration-300 border border-[rgba(128,128,255,0.3)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <h3 className="text-[1.3rem] font-bold mb-4 bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
                ADMIRE HANDS
              </h3>
              <p className="text-[0.95rem] text-white/80 leading-7 mb-6 flex-grow">
                Celebrating creativity and artistic expression, Admire Hands focuses on digital art, UI/UX design, and
                creative technology applications that blend technical skills with artistic vision.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Digital Art
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  UI/UX Design
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Creative Tech
                </span>
              </div>
            </div>

            {/* Club card 5 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] text-center transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-[rgba(128,128,255,0.3)]">
              <div className="w-20 h-20 bg-[rgba(128,128,255,0.15)] rounded-full flex items-center justify-center mx-auto mb-6 text-white/90 transition-all duration-300 border border-[rgba(128,128,255,0.3)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-[1.3rem] font-bold mb-4 bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
                CRAZY BRAINS
              </h3>
              <p className="text-[0.95rem] text-white/80 leading-7 mb-6 flex-grow">
                Fostering innovation and problem-solving, Crazy Brains hosts brainstorming sessions, ideathons, and
                innovation challenges to develop creative solutions to real-world problems.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Ideathons
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Problem Solving
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Innovation Challenges
                </span>
              </div>
            </div>

            {/* Club card 6 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] text-center transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:border-[rgba(128,128,255,0.3)]">
              <div className="w-20 h-20 bg-[rgba(128,128,255,0.15)] rounded-full flex items-center justify-center mx-auto mb-6 text-white/90 transition-all duration-300 border border-[rgba(128,128,255,0.3)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-[1.3rem] font-bold mb-4 bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
                HAPPY BRIDGE
              </h3>
              <p className="text-[0.95rem] text-white/80 leading-7 mb-6 flex-grow">
                Dedicated to student welfare and mental health, Happy Bridge organizes recreational activities, stress
                management workshops, and peer support programs to enhance campus well-being.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Wellness Programs
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Recreational Events
                </span>
                <span className="text-[0.75rem] bg-[rgba(128,128,255,0.1)] px-3 py-1 rounded-full text-white/90">
                  Peer Mentoring
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="/association"
              className="inline-block bg-[rgba(128,128,255,0.2)] text-white px-6 py-3 rounded-full font-medium transition-all border border-[rgba(128,128,255,0.3)] hover:bg-[rgba(128,128,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(128,128,255,0.3)]"
            >
              Learn More About Our Clubs
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Student{" "}
            <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">Projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform transition-shadow duration-300 border border-[rgba(128,128,255,0.1)] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
              <div className="h-44">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22731ce444"
                  alt="Smart Campus"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Smart Campus</h3>
                <p className="text-white/70 text-sm mb-4 leading-6">
                  IoT-based campus monitoring and management system with real-time analytics.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[rgba(128,128,255,0.15)] px-3 py-1 rounded-full text-[0.75rem] text-white/90">
                    IoT
                  </span>
                  <span className="bg-[rgba(128,128,255,0.15)] px-3 py-1 rounded-full text-[0.75rem] text-white/90">
                    Python
                  </span>
                  <span className="bg-[rgba(128,128,255,0.15)] px-3 py-1 rounded-full text-[0.75rem] text-white/90">
                    React
                  </span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform transition-shadow duration-300 border border-[rgba(128,128,255,0.1)] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
              <div className="h-44">
                <img
                  src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1"
                  alt="AI Attendance"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">AI Attendance System</h3>
                <p className="text-white/70 text-sm mb-4 leading-6">
                  Facial recognition based attendance tracking system for classrooms.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[rgba(128,128,255,0.15)] px-3 py-1 rounded-full text-[0.75rem] text-white/90">
                    Computer Vision
                  </span>
                  <span className="bg-[rgba(128,128,255,0.15)] px-3 py-1 rounded-full text-[0.75rem] text-white/90">
                    TensorFlow
                  </span>
                  <span className="bg-[rgba(128,128,255,0.15)] px-3 py-1 rounded-full text-[0.75rem] text-white/90">
                    Flask
                  </span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform transition-shadow duration-300 border border-[rgba(128,128,255,0.1)] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
              <div className="h-44">
                <img
                  src="https://images.unsplash.com/photo-1504639725590-34d0984388bd"
                  alt="AR Learning"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">AR Learning Platform</h3>
                <p className="text-white/70 text-sm mb-4 leading-6">
                  Augmented reality application for interactive learning of complex CS concepts.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[rgba(128,128,255,0.15)] px-3 py-1 rounded-full text-[0.75rem] text-white/90">
                    Unity
                  </span>
                  <span className="bg-[rgba(128,128,255,0.15)] px-3 py-1 rounded-full text-[0.75rem] text-white/90">
                    ARKit
                  </span>
                  <span className="bg-[rgba(128,128,255,0.15)] px-3 py-1 rounded-full text-[0.75rem] text-white/90">
                    C#
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Student{" "}
            <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">Voices</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-lg p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)]">
              <div className="italic text-white/90 leading-7 mb-6">
                <p>
                  "The CSE Association has provided me with invaluable opportunities to develop my technical skills and
                  leadership abilities."
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4 border-2 border-[rgba(128,128,255,0.3)]">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm">Priya Sharma</div>
                  <div className="text-[0.8rem] text-white/60">Final Year, CSE</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[rgba(20,20,50,0.5)] rounded-lg p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)]">
              <div className="italic text-white/90 leading-7 mb-6">
                <p>
                  "Participating in the hackathons organized by the CSE Association helped me secure an internship at a
                  leading tech company."
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4 border-2 border-[rgba(128,128,255,0.3)]">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm">Rahul Gupta</div>
                  <div className="text-[0.8rem] text-white/60">Third Year, CSE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="relative py-24 text-center overflow-hidden bg-gradient-to-br from-[rgba(20,20,50,0.8)] to-[rgba(10,10,40,0.8)]"
        id="join"
      >
        <div
          className="absolute inset-0 opacity-10 -z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8dGVjaG5vbG9neXx8fHx8fDE2MzA1MjUyMDQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600')",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">
              Join the{" "}
              <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
                Association
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-xl mx-auto mb-8">
              Become a member of the CSE Student Association and unlock a world of opportunities.
            </p>
            <a
              href="#join-form"
              className="inline-block bg-[rgba(128,128,255,0.3)] text-white px-8 py-3 rounded-full font-medium transition-all border border-[rgba(128,128,255,0.6)] shadow-[0_0_15px_rgba(128,128,255,0.3)] backdrop-blur-sm hover:bg-[rgba(128,128,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(128,128,255,0.4)]"
            >
              Become a Member
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

import React from 'react';

interface CallToActionProps {
}

const CallToAction: React.FC<CallToActionProps> = () => {
  return (
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
          </h2>
          <p className="text-xl text-white/90 max-w-xl mx-auto mb-8">
            Become a member of the CSE Student Association and unlock a world of opportunities.
          </p>
          <a
            href="#join-form"
            className="inline-block bg-[rgba(128,128,255,0.3)] text-white px-8 py-3 rounded-full font-medium transition-all border border-[rgba(128,128,255,0.6)] shadow-[0_0_15px_rgba(128,128,255,0.3)] backdrop-blur-sm hover:bg-[rgba(128,128,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(128,128,255,0.4)]"
          >
            View Member
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
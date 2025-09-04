import React from 'react';

interface TestimonialsProps {
  // You can add props here if needed
}

const Testimonials: React.FC<TestimonialsProps> = () => {
  return (
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
            </div>
            <div className="flex items-center">
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-[rgba(20,20,50,0.5)] rounded-lg p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)]">
            <div className="italic text-white/90 leading-7 mb-6">
            </div>
            <div className="flex items-center">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React from 'react';

interface StatisticProps {
  value: string;
  label: string;
}

const Statistic: React.FC<StatisticProps> = ({ value, label }) => {
  return (
    <div className="text-center">
      <div className="text-5xl font-bold bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent inline-block mb-2">
        {value}
      </div>
      <div className="text-base text-white/70 uppercase tracking-wide">{label}</div>
    </div>
  );
};

interface DepartmentHighlightsProps {
}

const DepartmentHighlights: React.FC<DepartmentHighlightsProps> = () => {
  return (
    <section className="py-20 bg-[rgba(15,15,40,0.5)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">
          Department{" "}
          <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
            Highlights
          </span>
        </h2>

        <div className="flex justify-around flex-wrap gap-8">
          <Statistic value="500+" label="Students" />
          <Statistic value="25+" label="Faculty" />
          <Statistic value="95%" label="Placement" />
          <Statistic value="50+" label="Publications" />
        </div>
      </div>
    </section>
  );
};

export default DepartmentHighlights;

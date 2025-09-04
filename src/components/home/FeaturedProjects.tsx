import React from 'react';

interface ProjectCardProps {
  imageUrl: string;
  altText: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, altText }) => {
  return (
    <div className="bg-[rgba(20,20,50,0.5)] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform transition-shadow duration-300 border border-[rgba(128,128,255,0.1)] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
      <div className="h-44">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6">
      </div>
    </div>
  );
};

interface FeaturedProjectsProps {
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = () => {
  const projects = [
    {
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22731ce444",
      altText: "Smart Campus"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1",
      altText: "AI Attendance"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
      altText: "AR Learning"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Student{" "}
          <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              imageUrl={project.imageUrl}
              altText={project.altText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

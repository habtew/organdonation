import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { donorStories } from '../utils/donorstories';

const DonorStories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If there are no stories, don't render the component
  if (!donorStories.length) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? donorStories.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === donorStories.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="donor-stories" className="section bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">Donor Stories</h2>
        <p className="section-subtitle">
          Real stories from donors and recipients that showcase the profound impact of organ donation.
        </p>

        <div className="mt-12 relative">
          {/* Main Story Card */}
          <div className="card max-w-4xl mx-auto overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img
                  src={donorStories[currentIndex].image}
                  alt={donorStories[currentIndex].name}
                  className="w-full h-60 md:h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-8">
                <div className="flex items-center mb-3">
                  <Quote size={24} className="text-primary-600 mr-2" />
                  <h3 className="text-lg sm:text-xl font-semibold">{donorStories[currentIndex].title}</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  {donorStories[currentIndex].story}
                </p>
                <div className="flex items-center">
                  <div>
                    <p className="font-medium text-gray-900">{donorStories[currentIndex].name}</p>
                    <p className="text-sm text-gray-600">{donorStories[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {donorStories.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary-600 scale-125' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-0 sm:-translate-x-6 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={goToPrevious}
            aria-label="Previous story"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-0 sm:translate-x-6 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={goToNext}
            aria-label="Next story"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Additional Stories Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {donorStories.slice(0, 3).map((story, index) => (
            <div 
              key={index}
              className={`card hover:scale-[1.02] ${
                index === currentIndex ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img 
                src={story.image} 
                alt={story.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h4 className="text-lg font-medium mb-2">{story.title}</h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {story.story}
                </p>
                <p className="font-medium text-primary-600">{story.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonorStories;
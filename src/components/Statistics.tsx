import React, { useState, useEffect, useRef } from 'react';
import { Users, Clock, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const statistics = [
  {
    icon: <Users size={36} className="text-secondary-600" />,
    value: 106000,
    label: 'People waiting for transplants',
    description: 'in the United States',
  },
  {
    icon: <Clock size={36} className="text-secondary-600" />,
    value: 17,
    label: 'People die each day',
    description: 'waiting for an organ',
  },
  {
    icon: <Heart size={36} className="text-secondary-600" />,
    value: 8,
    label: 'Lives can be saved',
    description: 'by a single donor',
  },
  {
    icon: <Award size={36} className="text-secondary-600" />,
    value: 39000,
    label: 'Transplants performed',
    description: 'in the last year',
  },
];

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: number;
  label: string;
  description: string;
  isVisible: boolean;
}> = ({ icon, value, label, description, isVisible }) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // animation duration in ms
  const increment = Math.ceil(value / (duration / 50)); // update every 50ms

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let timer: number;
    let currentCount = 0;

    const updateCount = () => {
      currentCount += increment;
      if (currentCount >= value) {
        currentCount = value;
        clearInterval(timer);
      }
      setCount(currentCount);
    };

    timer = window.setInterval(updateCount, 50);
    return () => clearInterval(timer);
  }, [value, increment, isVisible]);

  return (
    <div className={`card p-6 transform transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
          {count.toLocaleString()}
        </h3>
        <p className="text-lg font-medium text-gray-800 mb-1">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Statistics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="statistics" className="section bg-secondary-50" ref={sectionRef}>
      <div className="container-custom">
        <h2 className="section-title">The Impact of Donation</h2>
        <p className="section-subtitle">
          Every donation has the potential to save multiple lives. Here's why your decision matters.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-2xl shadow-md">
          <div className="md:flex items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img
                src="https://images.pexels.com/photos/6823562/pexels-photo-6823562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Medical professional with patient"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Every 9 Minutes
              </h3>
              <p className="text-gray-700 text-lg mb-6">
                Another person is added to the national transplant waiting list. Your
                decision to become an organ donor could mean the difference between life
                and death for someone waiting for a transplant.
              </p>
              <p className="text-gray-700 mb-6">
                The need for organ donors has never been greater. By registering to be a
                donor, you're giving hope to the thousands of people waiting for a
                life-saving transplant.
              </p>
              <div className="md:w-1/3 text-center md:text-right">
                                <Link
                                  to="/signup"
                                  className="inline-block bg-[rgb(22,163,73)] hover:bg-[rgb(18,138,62)] text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                                >
                                  Sign Up Now
                                </Link>
                              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
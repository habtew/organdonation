import React from 'react';
import { ClipboardList, FileCheck, HeartPulse, Stethoscope, UserCheck } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardList className="text-primary-600" size={36} />,
    title: 'Register',
    description: 'Register as an organ donor online or when you renew your driver\'s license.',
  },
  {
    icon: <UserCheck className="text-primary-600" size={36} />,
    title: 'Share Your Decision',
    description: 'Tell your family about your decision to be an organ donor.',
  },
  {
    icon: <Stethoscope className="text-primary-600" size={36} />,
    title: 'Medical Evaluation',
    description: 'If organ donation becomes possible, medical professionals evaluate organ viability.',
  },
  {
    icon: <HeartPulse className="text-primary-600" size={36} />,
    title: 'Matching Process',
    description: 'A national system matches donated organs to recipients based on medical criteria.',
  },
  {
    icon: <FileCheck className="text-primary-600" size={36} />,
    title: 'The Gift of Life',
    description: 'Your donation saves lives, with one donor able to help up to 8 people.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container-custom">
        <h2 className="section-title">How Organ Donation Works</h2>
        <p className="section-subtitle">
          Understanding the organ donation process can help you make an informed decision.
        </p>

        <div className="relative mt-16">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>

          {/* Process Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-5 h-5 rounded-full bg-primary-600 border-4 border-white shadow-md"></div>
                  </div>

                  {/* Content */}
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-gray-50 p-6 rounded-xl shadow-soft transform transition-transform duration-300 hover:scale-105">
                      <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        {index % 2 === 1 && <div className="mr-4">{step.icon}</div>}
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        {index % 2 === 0 && <div className="ml-4">{step.icon}</div>}
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Empty Space for Timeline */}
                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
import React from "react";
import { HeartPulse, Users, Smile } from "lucide-react";

const ImportanceOfDonation: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Why Donation Matters
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Organ donation is a life-saving act of kindness. Every donor can
            impact multiple lives, giving hope where there was none.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[rgb(22,163,73)] bg-opacity-10 p-4 inline-block rounded-full mb-4">
              <HeartPulse className="h-10 w-10 text-[rgb(22,163,73)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              Save Lives
            </h3>
            <p className="text-gray-700">
              One organ donor can save up to eight lives through transplants.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[rgb(22,163,73)] bg-opacity-10 p-4 inline-block rounded-full mb-4">
              <Users className="h-10 w-10 text-[rgb(22,163,73)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              Support Communities
            </h3>
            <p className="text-gray-700">
              Donation brings communities together to support those in urgent
              need.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-[rgb(22,163,73)] bg-opacity-10 p-4 inline-block rounded-full mb-4">
              <Smile className="h-10 w-10 text-[rgb(22,163,73)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              Create Legacy
            </h3>
            <p className="text-gray-700">
              Leave behind a lasting impact and bring joy to families in
              despair.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportanceOfDonation;

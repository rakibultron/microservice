"use client";

import { Button } from "@/components/ui/button";
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../public/ticket-lottie-json.json";

const HomeBanner = () => {
  const options = {
    animationData: groovyWalkAnimation,
    loop: true,
  };

  const { View } = useLottie(options);
  return (
    <div className="justify-center flex p-6 md:p-12 rounded-lg h-[60vh] ">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
            Get Ready for Adventure!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your ticket to amazing experiences starts here.
          </p>

          <div className="mt-6">
            <Button className="w-full md:w-auto">Get Tickets</Button>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <>{View}</>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

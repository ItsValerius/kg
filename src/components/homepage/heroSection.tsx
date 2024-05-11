import React from "react";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";

const HeroSection = () => {
  return (
    <section className="px-4 md:px-6 flex flex-col items-center justify-center bg-[url(https://knallkoepp-golkrath.de/s/img/emotionheader.jpg)] bg-fill bg-center lg:bg-cover min-h-64 lg:bg-top">
      <div className="max-w-3xl text-center space-y-4 text-white lg:p-4 ">
        <H1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl [text-shadow:_0_4px_0_rgb(0_0_0/_80%)]">
          Feiern Sie mit uns!
        </H1>
        <H2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 [text-shadow:_0_2px_0_rgb(0_0_0/_80%)] border-0">
          Entdecken Sie die Tradition und den Spaß des deutschen Karnevals mit
          unserem Verein.
        </H2>
      </div>
    </section>
  );
};

export default HeroSection;

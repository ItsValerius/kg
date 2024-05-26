import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { cn } from "@/lib/utils";
import { getImageProps } from "next/image";

const HeroSection = () => {
  function getBackgroundImage(srcSet = "") {
    const imageSet = srcSet
      .split(", ")
      .map((str) => {
        const [url, dpi] = str.split(" ");
        return `url("${url}") ${dpi}`;
      })
      .join(", ");
    return `image-set(${imageSet})`;
  }

  const {
    props: { srcSet },
  } = getImageProps({
    alt: "",
    width: 1080,
    height: 256,
    src: "https://knallkoepp-golkrath.de/s/img/emotionheader.jpg",
  });
  const backgroundImage = getBackgroundImage(srcSet);
  const style = { backgroundSize: "cover", backgroundImage };

  return (
    <section
      style={style}
      className={cn(
        "bg-fill flex min-h-64 flex-col items-center justify-center bg-center px-4 [border-image:linear-gradient(hsl(130_80%_10%_/_0.5),_hsl(130_50%_80%_/_0.5))_fill_1] md:px-6 lg:bg-cover lg:bg-top",
      )}
    >
      <div className="max-w-3xl space-y-4 text-center text-white lg:p-4 ">
        <H1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
          Feiern Sie mit uns!
        </H1>
        <H2 className="scroll-m-20 border-0 text-3xl font-semibold tracking-tight first:mt-0">
          Entdecken Sie die Tradition und den Spaß des deutschen Karnevals mit
          unserem Verein.
        </H2>
      </div>
    </section>
  );
};

export default HeroSection;

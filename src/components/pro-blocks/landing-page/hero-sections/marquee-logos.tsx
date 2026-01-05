import { Marquee } from "@/components/ui/marquee"
import { cn } from "@/lib/utils"

const logos = [
  {
    name: "Vercel",
    img: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
  },
  {
    name: "Next.js",
    img: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png",
  },
  {
    name: "React",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "TypeScript",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  },
  {
    name: "Tailwind CSS",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "Node.js",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  },
  {
    name: "GitHub",
    img: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  },
  {
    name: "Figma",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
]

const LogoCard = ({
  img,
  name,
}: {
  img: string
  name: string
}) => {
  return (
    <figure
      className={cn(
        "relative flex items-center justify-center px-4 py-4 sm:px-5 sm:py-5 md:px-7 md:py-6 transition-all duration-300"
      )}
    >
      <img 
        className="h-7 w-auto sm:h-9 md:h-10 object-contain cursor-pointer hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
        alt={name} 
        src={img} 
      />
    </figure>
  )
}

export function MarqueeLogos() {
  return (
    <div className="relative flex w-full max-w-3xl flex-col items-center justify-center overflow-hidden py-2 md:py-6 mx-auto px-4 md:px-0 ">
      <Marquee pauseOnHover className="[--duration:30s] overflow-hidden">
        {logos.map((logo) => (
          <LogoCard key={logo.name} {...logo} />
        ))}
      </Marquee>
    
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 md:w-1/3 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 md:w-1/3 bg-gradient-to-l"></div>
    </div>
  )
}
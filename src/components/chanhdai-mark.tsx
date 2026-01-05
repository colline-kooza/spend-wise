/* eslint-disable @next/next/no-img-element */
export function ChanhDaiMark(props: React.ComponentProps<"img">) {
  return (
    <img {...props} alt="JB logo" src={"/jb3d.png"} fetchPriority="high" />
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="${color}" d="M96 128H32V96h64v32ZM224 32h-64v64h64v32h-96V0h96v32ZM32 96H0V32h32v64ZM256 96h-32V32h32v64ZM96 32H32V0h64v32Z"/></svg>`;
}

export function JBMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 192 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M32 0h32v192H32v32H0v32h32v-32h32v-32H32V0ZM96 0h64v64h-32v32h32v32h-32v64h32v32h-64V192h32V160h-32V128h32V96h-32V64h32V32h-32V0Z"
      />
    </svg>
  );
}

export function getJBMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 192 256"><path fill="${color}" d="M32 0h32v192H32v32H0v32h32v-32h32v-32H32V0ZM96 0h64v64h-32v32h32v32h-32v64h32v32h-64V192h32V160h-32V128h32V96h-32V64h32V32h-32V0Z"/></svg>`;
}

import Image from "next/image";
import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href}>
      <Image
        src="/logos/logo-3.png"
        alt="WalkieCheck Logo"
        width={36}
        height={36}
        className="h-10 w-40  shadow-indigo-500/30 object-cover"
      />
    </Link>
  );
}

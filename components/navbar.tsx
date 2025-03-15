import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex justify-center py-4 lg:justify-start">
      <Image
        src={"/nykredit.svg"}
        width={200}
        height={100}
        alt="Nykredit logo"
      />
    </div>
  );
}

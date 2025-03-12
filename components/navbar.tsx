import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex justify-between py-4">
      <Image
        src={"/nykredit.svg"}
        width={200}
        height={100}
        alt="Nykredit logo"
      />
    </div>
  );
}

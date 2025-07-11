import Link from "next/link";

export default function Home() {
  return (
   <div className="flex  justify-center">
   hi 
   <Link href="sign-in" className="text-blue-600">Login</Link>
   </div>
  );
}

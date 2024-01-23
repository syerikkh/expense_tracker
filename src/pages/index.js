import Image from "next/image";
import { Inter } from "next/font/google";
import { AppIcon } from "@/components/Icons/AppIcon";
import Link from "next/link";
import { BlueLabel } from "@/components/BlueLabel";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-1/2 h-full bg-[#0166FF] flex justify-center items-center">
        <h1 className="text-white text-9xl font-bold">Track<br></br> Your<br></br> Expenses</h1>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="flex flex-col gap-10 justify-center items-center w-96">
          <div className="flex justify-center items-center gap-3">
            <AppIcon />
            <h1 className="font-semibold text-3xl">Geld</h1>
          </div>
          <div className="text-center flex gap-3 flex-col">
            <h1 className="font-semibold text-3xl">Welcome Back</h1>
            <p className="text-xl text-[#334155]">Welcome back, Please enter your details</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div>
              <input type="text" placeholder="Email" className="p-2 border w-full rounded-md"></input>
            </div>
            <div>
              <input type="text" placeholder="Password" className="p-2 border w-full rounded-md"></input>
            </div>
            <div>
              <BlueLabel text='Log in' />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center flex gap-2">
              <p>Don’t have account?</p>
              <Link href="/signUp"><button className="text-[#0166FF]">Sign up</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

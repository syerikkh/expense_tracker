import Image from "next/image";
import { Inter } from "next/font/google";
import { AppIcon } from "@/components/Icons/AppIcon";
import Link from "next/link";
import { BlueLabel } from "@/components/BlueLabel";
import { LogIn } from "@/components/LogIn";
import { Loading } from "@/components/Loading";
import { Stepper } from "@/components/Currency";
import { Dashboard } from "@/components/Dashboard";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    // <LogIn />
    // <Loading />
    // <Stepper />
    <Dashboard />
  );
}

"use client";

import prisma from "@repo/db/client"
import { useBalance } from "@repo/store/useBalance" 

const Home = () => {
  const balance = useBalance()
  return (
    <div className="text-3xl">
      Hi from user home {balance}
    </div>
  )
}

export default Home

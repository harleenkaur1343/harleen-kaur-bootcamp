'use client';

import { motion } from "framer-motion";

export function LoadingSpinner({size = 24}:{size:number}){
  return(
    <div className="flex items-center justify-center">
      <motion.div 
        className="border-2 border-primary border-t-transparent rounded-full"
        style={{width:size, height:size}}
        animate={{rotate:360}}
        transition={{
          duration:1,
          ease:"linear",
          repeat:Infinity
        }}
      >
      </motion.div>
    </div>
  )
}
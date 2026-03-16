// app/tasks/new/page.tsx - Enhanced form
"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import  Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from 'lucide-react';
import { createTask } from "./action"
import { containerVariants, itemVariants } from "@/lib/animations"

// export default function NewTaskPage() {
//   return (
//     <div className="container mx-auto p-8 max-w-2xl">
//        <motion.div 
//        initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}>
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-xl">Create New Task</CardTitle>
//           <CardDescription>Add a new task to your list.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form action={createTask}>
//             <div className="space-y-2">
//               <Label className="text-lg mb-3" htmlFor="title">
//                 Task Title <span className="text-red-700">*</span>
//               </Label>
//               <Input
//                 name="title"
//                 id="title"
//                 placeholder="Do laundary..."
//                 required
//                 className="w-full mb-6"
//               ></Input>
//             </div>
//             <div className="space-y-2">
//               <Label className="text-lg mb-3" htmlFor="description">
//                 Description
//               </Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 placeholder="Add task details..."
//                 className="min-h-[100px] resize-none mb-6"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label className="text-lg mb-3" htmlFor="priority">Priority<span className="text-red-700">*</span></Label>
//               <Select name="priority" defaultValue="medium">
//                 <SelectTrigger className="w-full h-10 px-3">
//                   <SelectValue placeholder="Select priority" />
//                 </SelectTrigger>
//                 <SelectContent position="popper" align="start" side="bottom" sideOffset={4}>
//                   <SelectItem value="low">
//                     <span className="flex items-center gap-2">
//                       <span className="w-2 h-2 rounded-full bg-green-500" />
//                       Low
//                     </span>
//                   </SelectItem>
//                   <SelectItem value="medium">
//                     <span className="flex items-center gap-2">
//                       <span className="w-2 h-2 rounded-full bg-yellow-500" />
//                       Medium
//                     </span>
//                   </SelectItem>
//                   <SelectItem value="high">
//                     <span className="flex items-center gap-2">
//                       <span className="w-2 h-2 rounded-full bg-red-500" />
//                       High
//                     </span>
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex gap-3 pt-4">
//               <Button type="submit" className="flex-1">
//                 Create Task
//               </Button>
//               <Link href="/tasks">
//               <Button type="button" variant="outline" className="flex-1" >
//                 Cancel
//               </Button>
//               </Link>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//           </motion.div>
//       </div>
//   );
// }
export default function NewTaskPage() {
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-gray-100">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <CardTitle className="text-xl text-center text-2xl font-bold text-gray-900">Create New Task</CardTitle>
              <CardDescription className={`text-gray-500 mt-1 text-center`}>Add a new task to your list.</CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pt-6">
            <form action={createTask}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"          
              >

                {/* title */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1" 
                    htmlFor="title"
                  >
                    Task Title
                    <span className="text-red-700">*</span>
                  </Label>
                  <Input
                    name="title"
                    id="title"
                    placeholder="Do laundry..."
                    required
                    className="
                      w-full
                      border-gray-200
                      focus:border-blue-400
                      focus:ring-2 focus:ring-blue-100
                      transition-all duration-200
                      rounded-lg
                    "
                  />
                </motion.div>

                {/* description */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label
                    className="text-sm font-semibold text-gray-700"  
                    htmlFor="description"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Add task details..."
                    className="
                      min-h-[100px] resize-none
                      border-gray-200
                      focus:border-blue-400
                      focus:ring-2 focus:ring-blue-100
                      transition-all duration-200
                      rounded-lg
                    "
                  />
                </motion.div>

                {/* priority */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"  
                    htmlFor="priority"
                  >
                    Priority
                    <span className="text-red-700">*</span>
                  </Label>
                  <Select name="priority" defaultValue="medium">
                    <SelectTrigger
                      className="
                        w-full h-10 px-3
                        border-gray-200
                        focus:border-blue-400
                        focus:ring-2 focus:ring-blue-100
                        transition-all duration-200
                        rounded-lg
                      "
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      align="start"
                      side="bottom"
                      sideOffset={4}
                      className="rounded-lg shadow-lg"
                    >
                      {[
                        { value: "low",    label: "Low",    dot: "bg-green-500",  text: "text-green-700",  bg: "hover:bg-green-50"  },
                        { value: "medium", label: "Medium", dot: "bg-yellow-500", text: "text-yellow-700", bg: "hover:bg-yellow-50" },
                        { value: "high",   label: "High",   dot: "bg-red-500",    text: "text-red-700",    bg: "hover:bg-red-50"    },
                      ].map(({ value, label, dot, text, bg }) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className={`rounded-md cursor-pointer ${bg} transition-colors`}
                        >
                          <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${dot}`} />
                            <span className={`font-medium ${text}`}>{label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* buttons */}
                <motion.div variants={itemVariants} className="flex gap-3 pt-2">
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Button
                      type="submit"
                      className="
                        w-full
                        bg-gradient-to-r from-blue-500 to-blue-600
                        hover:from-blue-600 hover:to-blue-700
                        text-white font-semibold
                        rounded-lg shadow-md
                        transition-all duration-200
                      "
                    >
                      Create Task
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Link href="/tasks">
                      <Button
                        type="button"
                        variant="outline"
                        className="
                          px-6
                          border-gray-200
                          text-gray-600
                          hover:bg-gray-50
                          hover:text-gray-900
                          rounded-lg
                          transition-all duration-200
                        "
                      >
                        Cancel
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import type { Task } from "@/types/task";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Pencil } from "lucide-react";
import { itemVariants } from "@/lib/animations";

interface TaskCardProps {
  task: Task;
  index: number;

}
const priorityConfig = {
  low:    { badge: "bg-green-100 text-green-800",  dot: "bg-green-500",  label: "Low"    },
  medium: { badge: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500", label: "Medium" },
  high:   { badge: "bg-red-100 text-red-800",      dot: "bg-red-500",    label: "High"   },
};
export function TaskCard({ task, index } : TaskCardProps) {
 const priority = priorityConfig[task.priority];

  return (
    // <Card className="">
    //   <CardHeader className="">
    //     <div className="flex justify-between items-start">
    //       <div className="space-y-1">
    //         <h3 className="text-lg font-semibold leading-none tracking-tight">
    //           {task.title}
    //         </h3>
    //         <p className="text-sm text-muted-foreground">
    //           Created {new Date(task.created_at).toLocaleDateString()}
    //         </p>
    //       </div>

    //       <div className="flex items-center gap-2">
    //         <Badge
    //           variant="secondary"
    //           className={priorityColors[task.priority]}
    //         >
    //           {task.priority}
    //         </Badge>
    //         <Badge variant={task.completed ? "default" : "outline"}>
    //           {task.completed ? "Completed" : "Pending"}
    //         </Badge>
    //       </div>
    //     </div>
    //   </CardHeader>
    //   <Separator />
    //   <CardContent>
    //     <div>
    //       </div>
    //     <div className="flex justify-end gap-2">
    //       <Button variant="outline" size="sm" asChild>
    //         <Link href={`/tasks/${task.id}`}>View Details</Link>
    //       </Button>
    //       <Button variant="outline" size="sm" asChild>
    //         <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
    //       </Button>
    //     </div>
    //   </CardContent>
    // </Card>
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.08 }}   // ← stagger based on index
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="
        h-full flex flex-col          
        border border-gray-200
        shadow-sm hover:shadow-md
        bg-white/80 backdrop-blur-sm
        transition-shadow duration-200
        rounded-xl overflow-hidden p-0
      ">

        {/* colored top border based on priority */}
        <div className={`h-2 w-full ${priority.dot}`} />

        <CardHeader className="pb-3 pt-4 px-5">
          <div className="flex justify-between items-start gap-3">

            {/* title + date */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <h3 className="
                text-base font-semibold
                leading-snug tracking-tight
                text-gray-900
                line-clamp-2        
              ">
                {task.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>
                  Created {new Date(task.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* badges */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Badge
                variant="secondary"
                className={`${priority.badge} text-xs px-2 py-0.5 flex items-center gap-1`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                {priority.label}
              </Badge>
              <Badge
                variant={task.completed ? "default" : "outline"}
                className="text-xs px-2 py-0.5"
              >
                {task.completed ? "Completed" : "Pending"}
              </Badge>
            </div>

          </div>
        </CardHeader>

        {/* pushes buttons to bottom always */}
        <div className="flex-1" />

        <Separator className="mx-5 w-auto" />

        <CardContent className="px-5 py-3">
          <div className="flex justify-end gap-2">

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant="outline"
                size="sm"
                asChild
                className="
                  text-xs gap-1.5
                  border-gray-200
                  hover:border-blue-300
                  hover:text-blue-600
                  hover:bg-blue-50
                  transition-colors duration-200
                "
              >
                <Link href={`/tasks/${task.id}`}>
                  View Details
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant="outline"
                size="sm"
                asChild
                className="
                  text-xs gap-1.5
                  border-gray-200
                  hover:border-gray-400
                  hover:bg-gray-50
                  transition-colors duration-200
                "
              >
                <Link href={`/tasks/${task.id}/edit`}>
                  <Pencil className="w-3 h-3" />
                  Edit
                </Link>
              </Button>
            </motion.div>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

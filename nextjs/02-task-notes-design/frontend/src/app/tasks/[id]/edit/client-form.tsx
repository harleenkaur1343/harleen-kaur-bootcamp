"use client";
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
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { updateTask } from "./action";
import type { Task } from "@/types/task";
import { containerVariants, itemVariants } from "@/lib/animations"

interface AnimatedEditFormProps {
  task: Task;
  id: string;
}


export default function AnimatedEditForm({ task, id }: AnimatedEditFormProps) {
  const updateTaskWithId = updateTask.bind(null, id);

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-gray-100">

            {/* animated title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <CardTitle className="text-center text-2xl font-bold text-gray-900">
                Edit Task
              </CardTitle>
              <CardDescription className="text-gray-500 mt-1 text-center">
                Make changes to your task below
              </CardDescription>
            </motion.div>

          </CardHeader>

          <CardContent className="pt-6">
            <form action={updateTaskWithId}>

              {/* stagger children animation */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >

                {/* title field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                  >
                    Task Title
                    <span className="text-red-500">*</span>
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      name="title"
                      id="title"
                      placeholder="Do laundry..."
                      required
                      defaultValue={task.title}
                      className="
                        w-full h-11
                        border-gray-200
                        focus:border-blue-400
                        focus:ring-2 focus:ring-blue-100
                        transition-all duration-200
                        rounded-lg
                      "
                    />
                  </motion.div>
                </motion.div>

                {/* description field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Add task details..."
                    defaultValue={task.description? task.description : ""}
                    className="
                      min-h-[120px] resize-none
                      border-gray-200
                      focus:border-blue-400
                      focus:ring-2 focus:ring-blue-100
                      transition-all duration-200
                      rounded-lg
                    "
                  />
                </motion.div>

                {/* priority field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label
                    htmlFor="priority"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-1"
                  >
                    Priority
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select name="priority" defaultValue={task.priority ?? "medium"}>
                    <SelectTrigger
                      className="
                        w-full h-11
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
                <motion.div
                  variants={itemVariants}
                  className="flex gap-3 pt-2"
                >
                  {/* submit button with hover animation */}
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Button
                      type="submit"
                      className="
                        w-full h-11
                        bg-gradient-to-r from-blue-500 to-blue-600
                        hover:from-blue-600 hover:to-blue-700
                        text-white font-semibold
                        rounded-lg shadow-md
                        transition-all duration-200
                      "
                    >
                      Update Task
                    </Button>
                  </motion.div>

                  {/* cancel button with hover animation */}
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
                          h-11 px-6
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
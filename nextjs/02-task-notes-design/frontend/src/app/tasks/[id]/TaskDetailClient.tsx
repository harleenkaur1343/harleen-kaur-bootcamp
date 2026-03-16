// src/app/tasks/[id]/TaskDetailClient.tsx
"use client";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
// import { apiClient } from "@/lib/api-client";
import { toggleTaskCompletion, deleteTask } from "@/lib/actions"
import type { Task } from "@/types/task";

interface TaskDetailClientProps {
  task: Task;
}

const priorityConfig = {
  low:    { badge: "bg-green-100 text-green-800",   dot: "bg-green-500",  border: "border-green-200"  },
  medium: { badge: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500", border: "border-yellow-200" },
  high:   { badge: "bg-red-100 text-red-800",       dot: "bg-red-500",    border: "border-red-200"    },
};

export default function TaskDetailClient({ task }: TaskDetailClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [action, setAction] = useState<"toggle" | "delete" | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const priority = priorityConfig[task.priority];

  // toggle completion
  const handleToggle = () => {
    setAction("toggle");
    startTransition(async () => {
      try {
        await toggleTaskCompletion(task.id, !isCompleted);
        setIsCompleted(!isCompleted)  // optimistic update
      } catch (error) {
        console.error("Failed to toggle task:", error);
      } finally {
        setAction(null);
      }
    });
  };

  // delete task
  const handleDelete = () => {
    setAction("delete");
    startTransition(async () => {
      try {
        await deleteTask(task.id);
        setIsDeleteOpen(false);
        router.push("/tasks");        // ← go back to tasks after delete
        router.refresh();
      } catch (error) {
        console.error("Failed to delete task:", error);
        setAction(null);
      }
    });
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">

      {/* back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/tasks">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 gap-2 text-gray-500 hover:text-gray-900 -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tasks
          </Button>
        </Link>
      </motion.div>

      {/* main card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className={`
          bg-white rounded-2xl shadow-sm
          border border-gray-200
          overflow-hidden
        `}>

          {/* priority color bar */}
          <div className={`h-2 w-full ${priority.dot}`} />

          <div className="p-6 space-y-6">

            {/* header — title + badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {task.title}
                </h1>

                {/* action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={`/tasks/${task.id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDeleteOpen(true)}
                      className="gap-1.5 border-gray-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* badges row */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className={`${priority.badge} flex items-center gap-1.5 px-2.5`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>

                {/* completion badge — animated */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isCompleted ? "completed" : "pending"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      variant={isCompleted ? "default" : "outline"}
                      className={isCompleted
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "text-yellow-700 border-yellow-300 bg-yellow-50"
                      }
                    >
                      {isCompleted ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </Badge>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <Separator />

            {/* description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Description
              </p>
              <p className="text-gray-700 leading-relaxed">
                {task.description || (
                  <span className="text-gray-400 italic">
                    No description provided
                  </span>
                )}
              </p>
            </motion.div>

            <Separator />

            {/* created at */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-center gap-2 text-sm text-gray-400"
            >
              <Calendar className="w-4 h-4" />
              <span>
                Created {new Date(task.created_at).toLocaleString()}
              </span>
            </motion.div>

            <Separator />

            {/* toggle completion button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleToggle}
                  disabled={isPending}
                  className={`w-full gap-2 font-semibold rounded-lg transition-all duration-200 ${
                    isCompleted
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {action === "toggle" && isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : isCompleted ? (
                    <>
                      <Clock className="w-4 h-4" />
                      Mark as Incomplete
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Mark as Complete
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* delete confirmation dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete Task</DialogTitle>
            <DialogDescription className="text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                {task.title}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                disabled={isPending}
                className="border-gray-200"
              >
                Cancel
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleDelete}
                disabled={isPending}
                className="bg-red-500 hover:bg-red-600 text-white gap-2"
              >
                {action === "delete" && isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Task
                  </>
                )}
              </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

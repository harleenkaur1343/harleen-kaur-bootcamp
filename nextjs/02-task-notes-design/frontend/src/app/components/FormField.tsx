// src/app/components/FormField.tsx
"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

// each option for select
interface SelectOption {
  value: string
  label: string
  dot?: string        // ← optional color dot
  textColor?: string  // ← optional text color
}

interface FormFieldProps {
  id: string
  name: string
  label: string
  type?: "text" | "email" | "password" | "number" | "textarea" | "select"
  placeholder?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  error?: string
  success?: boolean
  // textarea specific
  rows?: number
  resize?: boolean
  // select specific
  options?: SelectOption[]
}

export default function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  error,
  success,
  rows = 4,
  resize = false,
  options = [],
}: FormFieldProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
      }}
      className="space-y-1.5"
    >
      <Label
        htmlFor={id}
        className="text-sm font-semibold text-gray-700 flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>

      {type !== "textarea" && type !== "select" && (
        <div className="relative">
          <Input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "w-full pr-9 transition-all duration-200 text-sm mb-2",
              "focus:ring-2 focus:ring-blue-100 focus:border-blue-400",
              error   && "border-red-400 focus:border-red-400 focus:ring-red-100",
              success && "border-green-400 focus:border-green-400 focus:ring-green-100",
            )}
          />

          <ValidationIcon error={error} success={success} />
        </div>
      )}

      {type === "textarea" && (
        <div className="relative">
          <Textarea
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className={cn(
              "w-full transition-all duration-200",
              "focus:ring-2 focus:ring-blue-100 focus:border-blue-400",
              !resize && "resize-none",
              error   && "border-red-400 focus:border-red-400 focus:ring-red-100",
              success && "border-green-400 focus:border-green-400 focus:ring-green-100",
            )}
          />
        </div>
      )}

      {type === "select" && (
        <Select
          name={name}
          value={value}
          onValueChange={onChange}       // ← Select uses onValueChange not onChange
        >
          <SelectTrigger
            className={cn(
              "w-full transition-all duration-200",
              "focus:ring-2 focus:ring-blue-100 focus:border-blue-400",
              error   && "border-red-400 focus:ring-red-100",
              success && "border-green-400 focus:ring-green-100",
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent
            position="popper"
            side="bottom"
            sideOffset={4}
            className="rounded-lg shadow-lg"
          >
            {options.map(({ value, label, dot, textColor }) => (
              <SelectItem
                key={value}
                value={value}
                className="cursor-pointer rounded-md transition-colors"
              >
                <span className="flex items-center gap-2">
                  {dot && (
                    <span className={`w-2 h-2 rounded-full ${dot}`} />
                  )}
                  <span className={textColor}>{label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* error message — shared across all types */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-500 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// extracted as small component — reused by input
function ValidationIcon({
  error,
  success,
}: {
  error?: string
  success?: boolean
}) {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          key="error"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <AlertCircle className="w-4 h-4 text-red-500" />
        </motion.div>
      )}
      {success && !error && (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>

const fieldClasses =
  "bg-vellum border border-gold-shadow font-serif text-ink placeholder:text-ink-muted focus:border-crimson-deep focus-visible:border-crimson-deep focus-visible:ring-2 focus-visible:ring-crimson-deep/30 focus-visible:ring-offset-0"

const labelClasses =
  "font-display uppercase tracking-[0.18em] text-xs text-crimson-deep"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: FormData) {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        if (result.warning) {
          toast.error(result.message, {
            duration: 8000,
            description: "Email system is not configured properly",
          })
        } else {
          toast.success("Message sent. I'll get back to you soon.", {
            duration: 5000,
            description: result.messageId
              ? `Message ID: ${result.messageId}`
              : undefined,
          })
        }
        form.reset()
      } else {
        if (response.status === 503) {
          toast.error(result.message, {
            duration: 10000,
            description:
              "If you received an email confirmation, your message was actually sent successfully despite this error.",
          })
        } else {
          throw new Error(result.message || "Failed to send message")
        }
      }
    } catch (error) {
      let errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later."

      if (
        errorMessage.includes("connection timed out") ||
        errorMessage.includes("Greeting never received")
      ) {
        errorMessage =
          "Connection timed out. This might be a temporary network issue."
      }

      toast.error(errorMessage, {
        duration: 10000,
        description: "You can also reach me directly at bmcgauley44@gmail.com",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  className={fieldClasses}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className={fieldClasses}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Message subject"
                  className={fieldClasses}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className={labelClasses}>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message here..."
                  className={`${fieldClasses} min-h-[180px]`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                SENDING...
              </>
            ) : (
              "SEND"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

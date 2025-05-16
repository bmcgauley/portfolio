"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageWithLoading } from "./image-with-loading"
import { FiX, FiChevronLeft, FiChevronRight, FiInfo, FiCommand } from "react-icons/fi"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useKeyboardNavigation, useFocusTrap } from "@/hooks/use-keyboard-navigation"

interface LightboxProps {
  images: Array<{ src: string; alt: string }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  // Use a div element ref to match motion.div's expected type
  const containerRef = useRef<HTMLDivElement>(null!)
  const [showInfo, setShowInfo] = useState(false)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)

  // Use keyboard navigation hook
  useKeyboardNavigation({
    onNext: () => currentIndex < images.length - 1 && onNavigate(currentIndex + 1),
    onPrevious: () => currentIndex > 0 && onNavigate(currentIndex - 1),
    onClose,
    onToggleInfo: () => setShowInfo(prev => !prev),
    onJumpTo: (index) => index < images.length && onNavigate(index),
    maxIndex: images.length - 1,
    enabled: !showKeyboardHelp // Disable navigation when help modal is open
  })

  // Trap focus within the lightbox
  useFocusTrap(containerRef, true)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      ref={containerRef}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowKeyboardHelp(true)}
            className="text-foreground/60 hover:text-foreground"
          >
            <FiCommand className="h-5 w-5" />
            <span className="sr-only">Keyboard shortcuts</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfo(!showInfo)}
            className="text-foreground/60 hover:text-foreground"
          >
            <FiInfo className="h-5 w-5" />
            <span className="sr-only">Toggle image info</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground"
          >
            <FiX className="h-6 w-6" />
            <span className="sr-only">Close lightbox</span>
          </Button>
        </div>

        {/* Image */}
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ImageWithLoading
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="object-contain w-full h-full"
                containerClassName="w-full h-full"
                width={1920}
                height={1080}
                quality={85}
                priority={true}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(currentIndex - 1)
              }}
              aria-label="Previous image"
            >
              <FiChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {currentIndex < images.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(currentIndex + 1)
              }}
              aria-label="Next image"
            >
              <FiChevronRight className="h-8 w-8" />
            </Button>
          )}
        </div>

        {/* Image Info */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm"
            >
              <p className="text-foreground font-medium">{images[currentIndex].alt}</p>
              <p className="text-muted-foreground text-sm mt-1">
                Image {currentIndex + 1} of {images.length}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard Shortcuts Help */}
        <AnimatePresence>
          {showKeyboardHelp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              onClick={() => setShowKeyboardHelp(false)}
            >
              <Card className="max-w-md p-6 m-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowKeyboardHelp(false)}
                  >
                    <FiX className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Navigation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Previous Image</span>
                        <kbd className="px-2 py-1 bg-muted rounded">←</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Image</span>
                        <kbd className="px-2 py-1 bg-muted rounded">→</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Toggle Info</span>
                        <kbd className="px-2 py-1 bg-muted rounded">i</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Close</span>
                        <kbd className="px-2 py-1 bg-muted rounded">Esc</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Jump to Image</span>
                        <span className="flex gap-1">
                          <kbd className="px-2 py-1 bg-muted rounded">1</kbd>
                          <span>-</span>
                          <kbd className="px-2 py-1 bg-muted rounded">9</kbd>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
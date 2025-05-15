"use client"

import { useEffect, useCallback } from 'react'

interface KeyboardNavigationOptions {
  onNext?: () => void
  onPrevious?: () => void
  onClose?: () => void
  onToggleInfo?: () => void
  onJumpTo?: (index: number) => void
  enabled?: boolean
  maxIndex?: number
  preventDefault?: boolean
}

export function useKeyboardNavigation({
  onNext,
  onPrevious,
  onClose,
  onToggleInfo,
  onJumpTo,
  enabled = true,
  maxIndex,
  preventDefault = true
}: KeyboardNavigationOptions) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return

    const actions = {
      ArrowRight: onNext,
      ArrowLeft: onPrevious,
      Escape: onClose,
      'i': onToggleInfo
    }

    // Handle number keys for direct navigation
    if (onJumpTo && maxIndex !== undefined && e.key >= '1' && e.key <= '9') {
      const index = parseInt(e.key) - 1
      if (index <= maxIndex) {
        onJumpTo(index)
        if (preventDefault) {
          e.preventDefault()
        }
        return
      }
    }

    const action = actions[e.key as keyof typeof actions]
    if (action) {
      if (preventDefault) {
        e.preventDefault()
      }
      action()
    }
  }, [enabled, onNext, onPrevious, onClose, onToggleInfo, onJumpTo, maxIndex, preventDefault])

  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, handleKeyDown])

  // Return a function to manually enable/disable the keyboard navigation
  return {
    enableKeyboardNav: () => {
      window.addEventListener('keydown', handleKeyDown)
    },
    disableKeyboardNav: () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }
}

// Utility function to check if an element is focusable
export function isFocusable(element: HTMLElement): boolean {
  const focusableTags = ['a', 'button', 'input', 'select', 'textarea']
  
  return (
    focusableTags.includes(element.tagName.toLowerCase()) ||
    element.getAttribute('tabindex') !== null ||
    element.getAttribute('contenteditable') === 'true'
  )
}

// Helper hook for focus trapping
export function useFocusTrap<T extends HTMLElement>(
  containerRef: React.RefObject<T>,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable.focus()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstFocusable?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [containerRef, enabled])
}
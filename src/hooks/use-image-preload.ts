"use client"

import { useState, useEffect } from 'react'

interface PreloadResult {
  progress: number
  total: number
  isComplete: boolean
}

export function useImagePreload(imageSrcs: string[]): PreloadResult {
  const [progress, setProgress] = useState(0)
  const total = imageSrcs.length

  useEffect(() => {
    let mounted = true
    let loadedCount = 0

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new window.Image()
        
        img.onload = () => {
          if (!mounted) return
          loadedCount++
          setProgress(loadedCount)
          resolve()
        }

        img.onerror = () => {
          if (!mounted) return
          loadedCount++
          setProgress(loadedCount)
          resolve() // Resolve anyway to continue loading other images
          console.warn(`Failed to preload image: ${src}`)
        }

        img.src = src
      })
    }

    // Reset progress when image sources change
    setProgress(0)
    loadedCount = 0

    // Preload all images concurrently
    Promise.all(imageSrcs.map(preloadImage))
      .catch(error => {
        console.error('Error preloading images:', error)
      })

    return () => {
      mounted = false
    }
  }, [imageSrcs])

  return {
    progress,
    total,
    isComplete: progress === total
  }
}

// Helper function to chunk array into smaller batches
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// Helper hook for batch loading with progress
export function useBatchImagePreload(imageSrcs: string[], batchSize = 6): PreloadResult {
  const [progress, setProgress] = useState(0)
  const total = imageSrcs.length

  useEffect(() => {
    let mounted = true
    let loadedCount = 0
    const batches = chunkArray(imageSrcs, batchSize)

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new window.Image()
        
        img.onload = () => {
          if (!mounted) return
          loadedCount++
          setProgress(loadedCount)
          resolve()
        }

        img.onerror = () => {
          if (!mounted) return
          loadedCount++
          setProgress(loadedCount)
          resolve()
          console.warn(`Failed to preload image: ${src}`)
        }

        img.src = src
      })
    }

    // Reset progress when image sources change
    setProgress(0)
    loadedCount = 0

    // Load batches sequentially
    const loadBatches = async () => {
      for (const batch of batches) {
        if (!mounted) break
        await Promise.all(batch.map(preloadImage))
      }
    }

    loadBatches().catch(error => {
      console.error('Error preloading images:', error)
    })

    return () => {
      mounted = false
    }
  }, [imageSrcs, batchSize])

  return {
    progress,
    total,
    isComplete: progress === total
  }
}
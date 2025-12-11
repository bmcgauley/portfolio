"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface MasonryGridProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor?: (item: T, index: number) => string | number
  columnCount?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: number
  className?: string
}

const defaultColumnCount = {
  mobile: 1,
  tablet: 2,
  desktop: 3
}

export function MasonryGrid<T>({
  items,
  renderItem,
  keyExtractor,
  columnCount = defaultColumnCount,
  gap = 16,
  className
}: MasonryGridProps<T>) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(columnCount.desktop || defaultColumnCount.desktop)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 640) {
        setColumns(columnCount.mobile || defaultColumnCount.mobile)
      } else if (width < 1024) {
        setColumns(columnCount.tablet || defaultColumnCount.tablet)
      } else {
        setColumns(columnCount.desktop || defaultColumnCount.desktop)
      }
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [columnCount])
  const getColumnItems = () => {
    // Ensure columns is never undefined by providing a fallback
    const columnCount = columns || defaultColumnCount.desktop;
    const columnItems: { item: T; originalIndex: number }[][] = Array.from({ length: columnCount }, () => [])
    items.forEach((item, i) => {
      columnItems[i % columnCount].push({ item, originalIndex: i })
    })
    return columnItems
  }

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid",
        {
          'grid-cols-1': columns === 1,
          'grid-cols-2': columns === 2,
          'grid-cols-3': columns === 3,
          'grid-cols-4': columns === 4,
        },
        className
      )}
      style={{ gap: `${gap}px`, alignItems: 'start' }}
    >
      <AnimatePresence mode="popLayout">
        {getColumnItems().map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col" style={{ gap: `${gap}px` }}>
            {column.map(({ item, originalIndex }, itemIndex) => (
              <motion.div
                key={keyExtractor ? keyExtractor(item, originalIndex) : originalIndex}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  delay: itemIndex * 0.05
                }}
              >
                {renderItem(item, originalIndex)}
              </motion.div>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
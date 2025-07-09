'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import clsx from 'clsx'

/**
 * Slider
 * ------
 * Props
 *  - value           : number                (controlled)
 *  - onValueChange   : (valueArr:number[])   (controlled callback – receives [val])
 *  - min             : number    (default 0)
 *  - max             : number    (default 100)
 *  - step            : number    (default 1)
 *
 * Usage example:
 *   <Slider
 *     min={1}
 *     max={3}
 *     step={0.1}
 *     value={zoom}
 *     onValueChange={(val) => setZoom(val[0])}
 *   />
 */
export function Slider ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  ...rest
}) {
  return (
    <SliderPrimitive.Root
      className={clsx(
        'relative flex items-center touch-none select-none w-full h-6',
        className
      )}
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
      {...rest}
    >
      {/* Track */}
      <SliderPrimitive.Track className="bg-gray-300 dark:bg-gray-700 relative grow rounded-full h-1">
        <SliderPrimitive.Range className="absolute bg-black dark:bg-white rounded-full h-full" />
      </SliderPrimitive.Track>

      {/* Thumb */}
      <SliderPrimitive.Thumb
        className="block w-4 h-4 bg-white dark:bg-gray-900 border border-gray-400 dark:border-gray-600
                   rounded-full shadow hover:bg-gray-50 dark:hover:bg-gray-800
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white
                   transition-colors"
      />
    </SliderPrimitive.Root>
  )
}

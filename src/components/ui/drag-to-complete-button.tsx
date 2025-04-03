import React, { useCallback, useRef, useState } from 'react';
import { ChevronsRight } from 'lucide-react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility

interface DragToCompleteButtonProps {
  onComplete: () => void;
  onClose?: () => void;
  text?: string;
  completeText?: string;
  className?: string;
  sliderClassName?: string;
  thumbClassName?: string;
  delay?: number;
  variant?: 'rounded' | 'sharp'; // Add variant prop
}

const THUMB_WIDTH_PX = 48; // w-12 translates to 48px

const DragToCompleteButton: React.FC<DragToCompleteButtonProps> = ({
  onComplete,
  onClose,
  text = 'Slide to Complete',
  completeText = 'Completed!',
  className,
  sliderClassName,
  thumbClassName,
  delay = 1000,
  variant = 'rounded', // Default to 'rounded'
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  // Calculate the width for the filled track based on drag position and thumb width
  const filledWidth = useTransform(dragX, latestX => {
    // Add thumb width to the dragged distance for the fill effect
    return latestX + THUMB_WIDTH_PX;
  });

  const handleDragEnd = useCallback(() => {
    if (!constraintsRef.current || isComplete) return;

    const sliderWidth = constraintsRef.current.offsetWidth;
    const completeThreshold = sliderWidth - THUMB_WIDTH_PX - 10; // A bit of buffer

    if (dragX.get() >= completeThreshold) {
      setIsComplete(true);
      // Snap to end visually
      void animate(dragX, sliderWidth - THUMB_WIDTH_PX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });

      // Call onComplete immediately
      onComplete();

      // If onClose is provided, call it after the specified delay
      if (onClose) {
        setTimeout(() => {
          onClose();
          setIsComplete(false);
        }, delay);
      }
    } else {
      // Snap back to start using explicit animation
      void animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  }, [dragX, onComplete, onClose, isComplete]);

  // Fade out text as thumb moves right
  const textOpacity = useTransform(dragX, [70, 100], [1, 0.8]);
  // Control background color transition (optional)
  // const backgroundColor = useTransform(
  //   dragX,
  //   [0, constraintsRef.current?.offsetWidth ?? 300 - 60],
  //   ["hsl(var(--primary))", "hsl(var(--success))"] // Example colors
  // );

  return (
    <div
      ref={constraintsRef}
      className={cn(
        'relative w-full h-12 bg-pop-black-500 border border-pop-black-100 overflow-hidden cursor-grab active:cursor-grabbing select-none',
        variant === 'rounded' ? 'rounded-full' : 'rounded-none', // Conditional border radius for container
        isComplete && 'bg-success-500 cursor-default', // Success state styling
        className
      )}
      style={{ touchAction: 'none' }} // Prevent scrolling on touch devices
    >
      <motion.div
        className={cn(
          'absolute inset-0 bg-transparent',
          variant === 'rounded' ? 'rounded-full' : 'rounded-none',
          sliderClassName
        )}
      />

      {/* Filled Track (Sharp Variant Only) */}
      {variant === 'sharp' && !isComplete && (
        <motion.div
          className={cn(
            'absolute top-0 left-0 h-full bg-primary',
            'rounded-[2px]', // Match sharp thumb radius
            isComplete && 'bg-success-500'
          )}
          style={{ width: filledWidth }} // Animated width
        />
      )}

      {/* Draggable Thumb */}
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onPointerDown={e => {
          e.stopPropagation();
        }}
        style={{ x: dragX }}
        className={cn(
          'absolute top-0 left-0 h-full w-12 bg-primary flex items-center justify-center shadow z-10', // Added z-10
          variant === 'rounded' ? 'rounded-full' : 'rounded-[2px]', // Conditional border radius for thumb
          isComplete && 'bg-transparent text-pop-black-500 shadow-none', // Adjust thumb appearance on complete
          thumbClassName
        )}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {!isComplete && (
          <ChevronsRight className="w-5 h-5 text-primary-foreground" />
        )}
      </motion.div>

      <motion.span
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center text-sm font-medium text-primary pointer-events-none z-20" // Added z-20
      >
        {isComplete ? completeText : text}
      </motion.span>
    </div>
  );
};

export default DragToCompleteButton;

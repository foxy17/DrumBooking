import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { type SignatureModalProps } from '@/types/modals';

export const SignatureModal = ({
  id,
  onSave,
  studentName,
  onClose,
}: SignatureModalProps) => {
  const signaturePadRef = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  useEffect(() => {
    // Resize signature pad when orientation changes or when component mounts
    const resizeCanvas = () => {
      if (signaturePadRef.current) {
        const canvas = signaturePadRef.current.getCanvas();
        const ratio = Math.max(window.devicePixelRatio || 1, 1);

        // Get the container dimensions
        const container = canvas.parentElement;
        if (container) {
          // Force the parent to have the full height of its container first
          container.style.width = '100%';
          container.style.height = '100%';

          // Set canvas dimensions to match container with proper pixel ratio
          canvas.width = container.offsetWidth * ratio;
          canvas.height = container.offsetHeight * ratio;
          canvas.style.width = `${container.offsetWidth}px`;
          canvas.style.height = `${container.offsetHeight}px`;

          // Scale the context for high DPI displays
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.scale(ratio, ratio);
          }

          // Clear and redraw if needed
          signaturePadRef.current.clear();
        }
      }
    };

    // Initial resize with a longer delay to ensure DOM is ready
    setTimeout(resizeCanvas, 300);

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isLandscape]);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setIsEmpty(true);
    }
  };

  const handleSave = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const signatureData = signaturePadRef.current.toDataURL('image/png');
      onSave?.(signatureData);
      onClose?.();
    }
  };

  const checkIfEmpty = () => {
    if (signaturePadRef.current) {
      setIsEmpty(signaturePadRef.current.isEmpty());
    }
  };

  // Set up the signature pad after it's mounted
  useEffect(() => {
    if (signaturePadRef.current) {
      const canvas = signaturePadRef.current.getCanvas();

      // Add event listener for end drawing
      canvas.addEventListener('mouseup', checkIfEmpty);
      canvas.addEventListener('touchend', checkIfEmpty);

      return () => {
        // Clean up event listeners
        canvas.removeEventListener('mouseup', checkIfEmpty);
        canvas.removeEventListener('touchend', checkIfEmpty);
      };
    }
  }, []);

  return (
    <Dialog
      open={true} // Always open since the component is only rendered when it should be open
      onOpenChange={open => {
        if (!open) onClose?.();
      }}
    >
      <DialogContent className="flex flex-col h-[95dvh] max-w-[95vw] rounded-md">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-cirka tracking-wide">
            {studentName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col p-2 bg-pop-black-400/10 flex-grow">
          <div
            className={cn(
              'border border-pop-black-100  bg-white rounded-md overflow-hidden relative'
            )}
          >
            <SignatureCanvas
              ref={signaturePadRef}
              penColor="black"
              velocityFilterWeight={0.7}
              canvasProps={{
                className: 'w-full h-full absolute inset-0',
              }}
              onEnd={checkIfEmpty}
            />
          </div>

          <div
            className={cn(
              'mt-4 gap-4',
              isMobile ? 'flex flex-col' : 'flex justify-between'
            )}
          >
            <Button variant="outline" onClick={handleClear} className="w-full">
              Clear
            </Button>
            <Button
              variant="success"
              onClick={handleSave}
              disabled={isEmpty}
              className={cn(
                'w-full',
                isEmpty && 'opacity-80 cursor-not-allowed'
              )}
            >
              Start Class
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

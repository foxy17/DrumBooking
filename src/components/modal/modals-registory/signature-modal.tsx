import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { type SignatureModalProps } from '@/types/modals';

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
  studentName,
}) => {
  const signaturePadRef = useRef<SignaturePad>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setIsEmpty(true);
    }
  };

  const handleSave = () => {
    if (signaturePadRef.current && !isEmpty) {
      const signatureData = signaturePadRef.current.toDataURL('image/png');
      onSave(signatureData);
    }
  };

  const checkIfEmpty = () => {
    if (signaturePadRef.current) {
      setIsEmpty(signaturePadRef.current.isEmpty());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-cirka tracking-wide">
            Student Check-in Signature: {studentName}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <div className="flex-1 flex flex-col p-4 bg-pop-black-400/10">
          <div className="flex-1 border border-pop-black-100 bg-white rounded-md overflow-hidden">
            <div className="w-full h-full">
              <SignaturePad
                ref={signaturePadRef}
                options={{
                  penColor: 'black',
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  velocityFilterWeight: 0.7,
                }}
                onEnd={checkIfEmpty}
              />
            </div>
          </div>

          <div className="flex justify-between mt-4 gap-4">
            <Button
              variant="outline"
              onClick={handleClear}
              className="w-full rounded-full"
            >
              Clear
            </Button>
            <Button
              onClick={handleSave}
              disabled={isEmpty}
              className={cn(
                'w-full rounded-full',
                isEmpty ? 'bg-gray-400' : 'bg-primary'
              )}
            >
              Save Signature
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

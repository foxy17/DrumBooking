import SignaturePad from 'react-signature-pad-wrapper';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

export const BottomSheet = ({ isOpen, onClose }) => {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent height="70vh">
        <DrawerHeader borderBottomWidth="1px">Sign With Date</DrawerHeader>
        <DrawerBody>
          <SignaturePad height={500} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

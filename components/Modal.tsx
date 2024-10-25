import React, { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

const Modal = ({ children, isOpen, onClose }: Props) => {

  if (!isOpen) return null;
  
  return (
    <div onClick={onClose} tabIndex={-1} className="h-screen w-screen fixed flex justify-center items-center bg-black/20 top-0 left-0 z-[1000]">
      <div onClick={(e) => e.stopPropagation()} className="max-w-screen-sm w-full bg-[#F9FAFB] rounded-[15px] p-[26px]">
        <div >
        {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

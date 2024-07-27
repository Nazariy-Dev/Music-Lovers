import { useCallback, useState } from "react";

export const useDisplayMessage = () => {
    const [message, setMessage] = useState<string>('');
    const [type, setType] = useState(""); // Type can be 'success', 'error', etc.
    const [isVisible, setIsVisible] = useState(false);
  
    // Function to show the message
    const show = useCallback((msg: string, msgType = "info", duration = 3000) => {
      setMessage(msg);
      setType(msgType);
      setIsVisible(true);
  
      // Hide the message after the specified duration
      // setTimeout(() => {
      //   setIsVisible(false);
      // }, duration);
    }, []);
  
    // Function to close the message
    const close = useCallback(() => {
      setIsVisible(false);
    }, []);
  
    return { show, close, message, type, isVisible };
  };
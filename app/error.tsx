'use client';

import { useEffect } from "react";
import EmptyPage from "./components/EmptyPage";

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
   <EmptyPage
      title="Something went wrong!!"
    />
   );
}
 
export default ErrorState;

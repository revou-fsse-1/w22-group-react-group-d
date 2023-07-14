'use client';

import { useEffect } from "react";

interface ErrorStateProps {
  error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
    <div>
      <h1>Error</h1>
      <h3>Something went wrong</h3>
    </div>
   );
}
 
export default ErrorState;

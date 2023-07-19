'use client';

import Heading from "./Heading";

interface EmptyPageProps {
  title?: string;
  subtitle?: string;
}

const EmptyPage: React.FC<EmptyPageProps> = ({
  title = "No exact matches",
  subtitle = "Reload the page",
}) => {

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
      </div>
    </div>
   );
}
 
export default EmptyPage;
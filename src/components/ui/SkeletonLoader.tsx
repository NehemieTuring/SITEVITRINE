import React from 'react';


interface SkeletonLoaderProps {
  variant?: 'page' | 'card' | 'text' | 'hero';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant = 'page', count = 1 }) => {
  const renderItem = (index: number) => {
    switch (variant) {
      case 'page':
        return (
          <div key={index} className="container mx-auto p-8 space-y-12">
            <div className="h-20 w-3/4 bg-muted animate-pulse rounded-md" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
            <div className="h-80 w-full bg-muted animate-pulse rounded-lg" />
          </div>
        );
      case 'card':
        return (
          <div key={index} className="h-96 w-full bg-muted animate-pulse rounded-2xl p-6 flex flex-col justify-end space-y-4">
             <div className="h-6 w-1/2 bg-muted-foreground/20 rounded" />
             <div className="h-4 w-3/4 bg-muted-foreground/20 rounded" />
          </div>
        );
      case 'text':
        return (
          <div key={index} className="space-y-4">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
            <div className="h-4 w-4/6 bg-muted animate-pulse rounded" />
          </div>
        );
      case 'hero':
        return (
          <div key={index} className="h-[70vh] w-full bg-muted animate-pulse rounded-3xl flex items-center justify-center">
             <div className="w-1/2 h-20 bg-muted-foreground/20 rounded-xl" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      {Array.from({ length: count }).map((_, i) => renderItem(i))}
    </div>
  );
};

export default SkeletonLoader;

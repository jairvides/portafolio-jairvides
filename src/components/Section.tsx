
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className, id, ...props }: SectionProps) => {
  return (
    <section
      id={id}
      className={cn('py-12 md:py-16 lg:py-20 container mx-auto px-4 md:px-6', className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;

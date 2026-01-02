interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article';
}

export function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={`w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 ${className}`}>
      {children}
    </Component>
  );
}

// Button styles

export default function ButtonText({children, className, ...rest}) {
   return (
      <h4 {...rest} className={`${className} text-base font-semibold text-background bg-primary px-4 py-2 rounded`}>{children}</h4>
   );
};

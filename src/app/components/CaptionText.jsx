// Under image captions


export default function CaptionText({children, className, ...rest}) {
    return (
       <h4 {...rest} className={`${className} text-xs text-secondary/70	`}>{children}</h4>
    );
 };

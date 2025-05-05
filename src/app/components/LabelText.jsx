// 	Forms labels

export default function LabelText({children, className, ...rest}) {
    return (
       <h4 {...rest} className={`${className} text-sm font-medium text-primary`}>{children}</h4>
    );
 };


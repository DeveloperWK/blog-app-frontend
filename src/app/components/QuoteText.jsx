// Special quote box

export default function QuoteText({ children, className, ...rest }) {
    return (
        <h4
            {...rest}
            className={`${className} border-l-4 pl-4 italic text-lg text-secondary border-primary`}
        >
            {children}
        </h4>
    );
}

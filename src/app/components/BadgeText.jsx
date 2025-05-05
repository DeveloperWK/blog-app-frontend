// A small piece of text or number that mainly indicates a status or a count.
// Small badge label

export default function CodeText({ children, className, ...rest }) {
    return (
        <h4
            {...rest}
            className={`${className} text-xs font-bold uppercase bg-primary text-background px-2 py-1 rounded`}
        >
            {children}
        </h4>
    );
}

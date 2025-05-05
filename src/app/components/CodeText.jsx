// Code block text

export default function CodeText({ children, className, ...rest }) {
    return (
        <h4
            {...rest}
            className={`${className} font-mono bg-card text-primary px-2 py-1 rounded`}
        >
            {children}
        </h4>
    );
}

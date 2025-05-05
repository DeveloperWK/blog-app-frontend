// Normal reading text

export default function Paragraph({className, children}) {
    return <p className={`${className} text-base leading-relaxed text-primary/80`}>{children}</p>;
};

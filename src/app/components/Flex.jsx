export default function Flex({ className, children, ...rest }) {
    return <div {...rest} className={`${className} flex items-center`}>{children}</div>;
}

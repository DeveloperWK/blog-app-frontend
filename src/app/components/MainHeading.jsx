// 	Page title
export default function MainHeading({ className, children }) {
    return <h1 className={`${className} text-4xl font-bold text-primary`}>{children}</h1>;
}

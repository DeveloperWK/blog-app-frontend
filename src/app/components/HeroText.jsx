export default function HeroText({ className, children }) {
    return (
        <h1
            className={`${className} text-5xl md:text-7xl font-extrabold text-primary`}
        >
            {children}
        </h1>
    );
}

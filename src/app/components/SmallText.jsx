// Footer, meta info

export default function SmallText({children, className}) {
    return <p className={`${className} text-sm text-secondary`}>{children}</p>;
};

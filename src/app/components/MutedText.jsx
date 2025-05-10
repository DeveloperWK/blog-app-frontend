export default function MutedText({ className, children }) {
  return <h3 className={`${className} text-sm text-secondary`}>{children}</h3>;
}

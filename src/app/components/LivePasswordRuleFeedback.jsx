const LivePasswordRuleFeedback = ({ password }) => {
  const passwordRules = {
    length: password?.length >= 8,
    upper: /[A-Z]/.test(password || ""),
    lower: /[a-z]/.test(password || ""),
    digit: /\d/.test(password || ""),
    symbol: /[^A-Za-z0-9]/.test(password || ""),
  };
  return (
    <div className="text-sm text-gray-400 space-y-1">
      <p>Password must contain:</p>
      <ul className="ml-4 list-disc">
        {Object.entries(passwordRules).map(([key, valid]) => (
          <li key={key} className={valid ? "text-green-400" : "text-red-400"}>
            {key === "length" && "At least 8 characters"}
            {key === "upper" && "An uppercase letter"}
            {key === "lower" && "A lowercase letter"}
            {key === "digit" && "A number"}
            {key === "symbol" && "A special character"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LivePasswordRuleFeedback;

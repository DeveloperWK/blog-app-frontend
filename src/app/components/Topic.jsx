import LabelText from "./LabelText";

export default function Topic({text}) {
    return (
        <div className="bg-border_color px-6 py-2 rounded-tl-xl rounded-br-xl cursor-pointer">
            <LabelText>{text}</LabelText>
        </div>
    );
}

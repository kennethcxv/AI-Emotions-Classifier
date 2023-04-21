import emojiMap from "./iconMap";

export default ({ children }) => {
    return (
        <div className="min-h-[35vh] w-full flex flex-col items-center justify-center gap-4">
            <h3 className="text-9xl">{emojiMap[children]}</h3>
            <h3 className="text-3xl first-letter:capitalize">{children}</h3>
        </div>
    );
};

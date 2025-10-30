import { useApp } from "../store"

export default function Title() {
    const title = useApp((x) => x.title);
    const setTitle = useApp((x) => x.setTitle);
    return (
        <div>
            <input
                className="py-1 pl-1 text-card text-[24px] font-serif focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add Title..."
            />
        </div>
    )
}

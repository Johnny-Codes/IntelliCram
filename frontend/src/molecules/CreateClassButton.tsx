
import { Link } from "react-router-dom";

export default function CreateClassButton() {

    return (
        <Link to="/classes/new">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="Black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="50"
                height="50"
            >
                <circle cx="12" cy="12" r="11" stroke="Black" fill="none" />
                <line x1="12" y1="6" x2="12" y2="18" stroke="Black" />
                <line x1="6" y1="12" x2="18" y2="12" stroke="Black" />
                <title>Create Class</title>
            </svg>
        </Link >);
}

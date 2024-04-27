interface HoverTextProps {
    content: string;
    className?: string;
}

/**
 *
 * shows <p>content</p> on hover of parent element
 *
 * requires class: .text-hover
 * parent requires class: .text-hover-parent
 * */
export default function HoverText(props: HoverTextProps) {
    return (
        <p
            className={
                "min-h-4 bg-neutral-600 p-1 rounded-s-sm rounded rounded-e-sm text-xs hidden " +
                props.className
            }
        >
            {props.content}
        </p>
    );
}

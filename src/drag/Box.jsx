import { useDrag } from 'react-dnd';
import { useState } from 'react';
import { ItemTypes } from './ItemTypes';
const baseStyle = {
    position: 'absolute',
    // border: '1px dashed gray',
    // backgroundColor: 'tr',
    padding: '0.5rem 1rem',
    cursor: 'move',
};
export const Box = ({ id, left, top, style, hideSourceOnDrag, title, setTitle, removeBox }) => {
    const [contentEditable, setContentEditable] = useState(true)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, left, top]);
    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag} />;
    }
    return (<div
        onContextMenu={function(event) {
            removeBox(id);
            event.preventDefault();
        }}
        onInput={function(event) {
            const selection = document.getSelection();
            setTitle(id, selection.toString());
            const range = document.createRange();
            range.setStart(selection.anchorNode, selection.anchorOffset);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);

        }}
        onClick={() => {setContentEditable(true)}}
        onBlur={() => setContentEditable(false)}
        contentEditable={contentEditable}
        ref={drag} style={{ ...baseStyle, ...style, left, top }} role="Box">
        {title}
    </div>);
};

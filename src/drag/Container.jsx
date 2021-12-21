import { useCallback, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Box } from './Box';
import update from 'immutability-helper';

export const uuid4 = () => {
    const ho = (n, p) => n.toString(16).padStart(p, 0); /// Return the hexadecimal text representation of number `n`, padded with zeroes to be of length `p`
    const data = crypto.getRandomValues(new Uint8Array(16)); /// Fill the buffer with random data
    data[6] = (data[6] & 0xf) | 0x40; /// Patch the 6th byte to reflect a version 4 UUID
    data[8] = (data[8] & 0x3f) | 0x80; /// Patch the 8th byte to reflect a variant 1 UUID (version 4 UUIDs are)
    const view = new DataView(data.buffer); /// Create a view backed by a 16-byte buffer
    return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}-${ho(view.getUint16(8), 4)}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`; /// Compile the canonical textual form from the array data
};


const styles = {
    width: '100%',
    height: '100%',
    // border: '1px solid black',
    position: 'relative',
};
export const Container = ({ hideSourceOnDrag }) => {
    const [boxes, setBoxes] = useState({
        virgin: { top: document.body.clientHeight * 0.20, left: document.body.clientWidth * 0.14, title: 'Virgin name', style: { fontWeight: 'bold', fontSize: "1.25rem", background: "#eeeeee", border: "solid 1px" } },
        chad: { top: document.body.clientHeight * 0.20, left: document.body.clientWidth * 0.52, title: 'Chad name', style: { fontWeight: 'bold', fontSize: "1.25rem", background: "#eeeeee", border: "solid 1px" } },
    });
    
    const moveBox = useCallback((id, left, top) => {
        setBoxes(update(boxes, {
            [id]: {
                $merge: { left, top },
            },
        }));
    }, [boxes, setBoxes]);
    const [, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            moveBox(item.id, left, top);
            return undefined;
        },
    }), [moveBox]);


    const removeBox = (id) => {
        setBoxes(update(boxes, {
            $unset: [id],
        }));
    };

    const setTitle = (id, text) => {
        setBoxes(update(boxes, {
            [id]: {
                $merge: { title: text },
            },
        }));
    };



    return (<div ref={drop} style={styles} 
            onDoubleClick={function(e) {
                const rect = e.target.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const left = rect.left + window.scrollX;
                const id = uuid4();
                const boxData = {top: e.clientY - top - 20, left: e.clientX - left - 80, title: 'Double click to edit'};
                setBoxes(update(boxes, {
                    $merge: { [id]: boxData },
                }));
            }}>
			{Object.keys(boxes).map((key) => {
            const { left, top, title, style } = boxes[key];
            return (<Box key={key} id={key} left={left} top={top} style={style} title={title} setTitle={setTitle} removeBox={removeBox} hideSourceOnDrag={hideSourceOnDrag}>
						
					</Box>);
        })}
		</div>);
};

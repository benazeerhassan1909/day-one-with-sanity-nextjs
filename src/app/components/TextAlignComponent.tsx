// TextAlignComponent.tsx

import React from 'react'

type TextAlign = 'left' | 'right' | 'center' | 'justify';

interface TextAlignProps {
    value?: TextAlign;
    children?: React.ReactNode;
}

export const TextAlign = (props: TextAlignProps) => {
    return (
        <div style={{ textAlign: props.value ? props.value : 'left', width: '100%' }}>
            {props.children}
        </div>
    )
}
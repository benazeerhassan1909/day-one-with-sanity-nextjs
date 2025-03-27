import { PortableText } from '@portabletext/react';

const RichText = ({ content }) => {
    const customComponents = {
        marks: {
            color: ({ value, children }) => (
                <span style={{ color: value?.hex }}>{children}</span>
            ),
            alignment: ({ value, children }) => (
                <div style={{ textAlign: value?.align }}>{children}</div>
            ),
        },
    };

    return <PortableText value={content} components={customComponents} />;
};

export default RichText;

import React from 'react';

interface HTMLContentProps {
    htmlContent: string;
}

const HTMLContent: React.FC<HTMLContentProps> = ({ htmlContent }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HTMLContent;

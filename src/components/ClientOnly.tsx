'use client';

import React, { useState, useEffect } from 'react';

type Props = {
    children: React.ReactNode;
}

const ClientOnly: React.FC<Props> = ({
    children
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) return null;

    return (
        <>
            {children}
        </>
    );
};

export default ClientOnly;
'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/components/util-functions'; // Adjust path if needed

interface FormattedDateProps {
    date: string | number | Date;
    placeholder?: string;
}

export default function FormattedDate({ date, placeholder = '...' }: FormattedDateProps) {
    const [displayDate, setDisplayDate] = useState<string>(placeholder);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            try {
                const dateObj = (date instanceof Date) ? date : new Date(date);
                if (!isNaN(dateObj.getTime())) {
                    setDisplayDate(formatDate(dateObj));
                } else {
                    setDisplayDate('Invalid Date');
                }
            } catch (error) {
                console.error("Error formatting date:", date, error);
                setDisplayDate('Error');
            }
        }
    }, [date, isMounted]);

    return <span key={String(isMounted)}>{displayDate}</span>;
}

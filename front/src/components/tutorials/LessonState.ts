import { useState, useEffect } from 'react';

interface Lesson {
    id: number;
    name: string;
    url: string;
    deletable: boolean;
    dirPath: string;
}

const defaultLessons: Lesson[] = [
    { id: 1, name: 'Hello Kirby!', url: 'exercises?tuto=1', deletable: false, dirPath: "/src/components/tutorials/tuto/1" },
    { id: 2, name: '3, 2, 1 Go!', url: 'exercises?tuto=2', deletable: false, dirPath: "/src/components/tutorials/tuto/2" },
    { id: 3, name: 'Branches', url: 'exercises?tuto=3', deletable: false, dirPath: "/src/components/tutorials/tuto/3" },
    { id: 4, name: 'Fruit Loops', url: 'exercises?tuto=4', deletable: false, dirPath: "/src/components/tutorials/tuto/4" },
    { id: 5, name: 'Strings', url: 'exercises?tuto=5', deletable: false, dirPath: "/src/components/tutorials/tuto/5" },
    { id: 6, name: 'Data Structures', url: 'exercises?tuto=6', deletable: false, dirPath: "/src/components/tutorials/tuto/6" },
    { id: 7, name: 'Objects', url: 'exercises?tuto=7', deletable: false, dirPath: "/src/components/tutorials/tuto/7" },
];

export const useLessons = () => {
    const [lessons, setLessons] = useState<Lesson[]>(() => {
        const savedLessons = localStorage.getItem('lessons');
        return savedLessons ? JSON.parse(savedLessons) : defaultLessons;
    });

    useEffect(() => {
        localStorage.setItem('lessons', JSON.stringify(lessons));
    }, [lessons]);

    return { lessons, setLessons };
};

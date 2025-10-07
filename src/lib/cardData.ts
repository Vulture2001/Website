import rawCards from '@/data/reflections.json';

// --------------------
// Types
// --------------------
export type Card = {
    id: number;
    scenario: string;
    description: 'Individual Impact' | 'Social Impact' | 'Environmental Impact';
};

// --------------------
// Type Guard
// --------------------
export function isCard(obj: any): obj is Card {
    return (
        typeof obj.id === 'number' &&
        typeof obj.scenario === 'string' &&
        (obj.description === 'Individual Impact' ||
            obj.description === 'Social Impact' ||
            obj.description === 'Environmental Impact')
    );
}

// --------------------
// Filter JSON using type guard
// --------------------
export const cardsData: Card[] = (rawCards as any[]).filter(isCard);

// --------------------
// Utility: draw random cards by type
// --------------------
export function drawRandomCardsByType(cards: Card[], perType = 2): Card[] {
    const types: Card['description'][] = [
        'Individual Impact',
        'Social Impact',
        'Environmental Impact',
    ];

    const cardsByType: Record<Card['description'], Card[]> = {
        'Individual Impact': [],
        'Social Impact': [],
        'Environmental Impact': [],
    };

    // Shuffle and pick `perType` cards for each type
    types.forEach(type => {
        const typeCards = cards.filter(c => c.description === type);
        if (!typeCards.length) return;

        const shuffled = [...typeCards].sort(() => Math.random() - 0.5);
        cardsByType[type] = shuffled.slice(0, perType);
    });

    // Column-wise ordering
    const numRows = Math.max(...Object.values(cardsByType).map(arr => arr.length));
    const result: Card[] = [];

    for (let row = 0; row < numRows; row++) {
        for (const type of types) {
            const card = cardsByType[type][row];
            if (card) result.push(card);
        }
    }

    return result;
}

export default cardsData;

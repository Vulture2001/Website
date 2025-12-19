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
// 1. Changed argument type from 'any' to 'unknown'
export function isCard(obj: unknown): obj is Card {
    // 2. Verify it is an object before accessing properties
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    // 3. Cast to a generic record to safely access properties
    const candidate = obj as Record<string, unknown>;

    return (
        typeof candidate.id === 'number' &&
        typeof candidate.scenario === 'string' &&
        (candidate.description === 'Individual Impact' ||
            candidate.description === 'Social Impact' ||
            candidate.description === 'Environmental Impact')
    );
}

// --------------------
// Filter JSON using type guard
// --------------------
// 4. Cast raw JSON to unknown[] instead of any[]
export const cardsData: Card[] = (rawCards as unknown[]).filter(isCard);

// --------------------
// Utility: draw random cards by type
// --------------------
export function drawRandomCardsByType(cards: Card[], perType = 1): Card[] {
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
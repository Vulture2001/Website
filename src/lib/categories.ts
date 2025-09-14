type Category = { label: string; value: string; color: string };

export function buildCategoryMaps(cats: Category[]) {
    const labelByValue = new Map<string, string>();
    const colorByValue = new Map<string, string>();
    for (const c of cats) {
        labelByValue.set(c.value, c.label);
        colorByValue.set(c.value, c.color);
    }
    return { labelByValue, colorByValue };
}

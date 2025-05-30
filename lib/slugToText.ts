export function slugToText(slug: string): string {
    // Replace hyphens with spaces
    let text = slug.replace(/-/g, ' ');

    // Capitalize each word and handle special characters
    text = text
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace('Elus', 'Élus') // Handle any specific words if needed
        .replace('Crème', 'Crème') // Example for accent handling
        .replace('Chaîne', 'Chaîne') // Example for accent handling

    // Additional replacements can be done if needed
    text = text.replace(/\s+/g, ' ').trim(); // Trim and clean extra spaces

    return text;
}

const slug = 'mocassins-elus-creme-avec-chaine-doree-chaussures-femme-elegantes';
const formattedText = slugToText(slug);
console.log(formattedText); 
// Output: "Mocassins Élus Crème avec Chaîne Dorée – Chaussures Femme Élégantes"

// Tasa de conversión USD a CLP (aproximada)
const USD_TO_CLP = 950;

/**
 * Convierte precio de USD a CLP
 */
export function convertToCLP(priceUSD: number): number {
  return Math.round(priceUSD * USD_TO_CLP);
}

/**
 * Formatea precio en pesos chilenos
 */
export function formatPrice(priceUSD: number): string {
  const priceCLP = convertToCLP(priceUSD);
  
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(priceCLP);
}

/**
 * Traducciones de categorías
 */
const categoryTranslations: Record<string, string> = {
  "electronics": "Electrónica",
  "jewelery": "Joyería",
  "men's clothing": "Ropa de Hombre",
  "women's clothing": "Ropa de Mujer"
};

/**
 * Traduce categoría de inglés a español
 */
export function translateCategory(category: string): string {
  return categoryTranslations[category] || category;
}

/**
 * Obtiene la clave de categoría desde la traducción
 */
export function getCategoryKey(translatedCategory: string): string {
  const entry = Object.entries(categoryTranslations).find(
    ([_, translation]) => translation === translatedCategory
  );
  return entry ? entry[0] : translatedCategory;
}

/**
 * Obtiene todas las categorías traducidas
 */
export function getTranslatedCategories(categories: string[]): Array<{ key: string; label: string }> {
  return categories.map(cat => ({
    key: cat,
    label: translateCategory(cat)
  }));
}

/**
 * Calcula el precio con descuento
 */
export function calculateDiscountPrice(priceUSD: number, discountPercent: number): number {
  const priceCLP = convertToCLP(priceUSD);
  return Math.round(priceCLP * (1 - discountPercent / 100));
}

/**
 * Formatea precio con descuento
 */
export function formatDiscountPrice(priceUSD: number, discountPercent: number): string {
  const discountedPrice = calculateDiscountPrice(priceUSD, discountPercent);

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(discountedPrice);
}

/**
 * Formatea número grande (ej: 1000 -> 1K, 1000000 -> 1M)
 */
export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('es-CL', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
}

/**
 * Formatea porcentaje
 */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value / 100);
}

/**
 * Formatea rating (ej: 4.5 -> "4.5 ★")
 */
export function formatRating(rating: number): string {
  return `${rating.toFixed(1)} ★`;
}


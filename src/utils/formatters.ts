/**
 * @fileoverview Utilidades de formateo para precios, categorías y números
 * @description Proporciona funciones para convertir y formatear datos de la aplicación,
 * incluyendo conversión de moneda USD a CLP, traducción de categorías y formateo de números.
 */

/**
 * Tasa de conversión de USD a CLP (aproximada)
 * @constant {number}
 * @default 950
 */
const USD_TO_CLP = 950;

/**
 * Convierte un precio de dólares estadounidenses (USD) a pesos chilenos (CLP)
 * @param {number} priceUSD - Precio en dólares estadounidenses
 * @returns {number} Precio convertido a pesos chilenos, redondeado al entero más cercano
 * @example
 * convertToCLP(100) // returns 95000
 */
export function convertToCLP(priceUSD: number): number {
  return Math.round(priceUSD * USD_TO_CLP);
}

/**
 * Formatea un precio en dólares a formato de moneda chilena (CLP)
 * @param {number} priceUSD - Precio en dólares estadounidenses
 * @returns {string} Precio formateado como string en formato CLP (ej: "$95.000")
 * @example
 * formatPrice(100) // returns "$95.000"
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
 * Diccionario de traducciones de categorías de inglés a español
 * @constant {Record<string, string>}
 */
const categoryTranslations: Record<string, string> = {
  "electronics": "Electrónica",
  "jewelery": "Joyería",
  "men's clothing": "Ropa de Hombre",
  "women's clothing": "Ropa de Mujer"
};

/**
 * Traduce el nombre de una categoría de inglés a español
 * @param {string} category - Nombre de la categoría en inglés
 * @returns {string} Nombre de la categoría traducido al español, o el original si no existe traducción
 * @example
 * translateCategory("electronics") // returns "Electrónica"
 * translateCategory("unknown") // returns "unknown"
 */
export function translateCategory(category: string): string {
  return categoryTranslations[category] || category;
}

/**
 * Obtiene la clave original en inglés de una categoría traducida al español
 * @param {string} translatedCategory - Nombre de la categoría en español
 * @returns {string} Clave de la categoría en inglés, o el valor original si no se encuentra
 * @example
 * getCategoryKey("Electrónica") // returns "electronics"
 */
export function getCategoryKey(translatedCategory: string): string {
  const entry = Object.entries(categoryTranslations).find(
    ([_, translation]) => translation === translatedCategory
  );
  return entry ? entry[0] : translatedCategory;
}

/**
 * Convierte un array de categorías en inglés a un array de objetos con clave y etiqueta traducida
 * @param {string[]} categories - Array de nombres de categorías en inglés
 * @returns {Array<{key: string, label: string}>} Array de objetos con clave original y etiqueta traducida
 * @example
 * getTranslatedCategories(["electronics", "jewelery"])
 * // returns [{ key: "electronics", label: "Electrónica" }, { key: "jewelery", label: "Joyería" }]
 */
export function getTranslatedCategories(categories: string[]): Array<{ key: string; label: string }> {
  return categories.map(cat => ({
    key: cat,
    label: translateCategory(cat)
  }));
}

/**
 * Calcula el precio final después de aplicar un descuento porcentual
 * @param {number} priceUSD - Precio original en dólares estadounidenses
 * @param {number} discountPercent - Porcentaje de descuento a aplicar (0-100)
 * @returns {number} Precio con descuento en CLP, redondeado al entero más cercano
 * @example
 * calculateDiscountPrice(100, 20) // returns 76000 (95000 - 20%)
 */
export function calculateDiscountPrice(priceUSD: number, discountPercent: number): number {
  const priceCLP = convertToCLP(priceUSD);
  return Math.round(priceCLP * (1 - discountPercent / 100));
}

/**
 * Formatea un precio con descuento aplicado en formato de moneda chilena
 * @param {number} priceUSD - Precio original en dólares estadounidenses
 * @param {number} discountPercent - Porcentaje de descuento a aplicar (0-100)
 * @returns {string} Precio con descuento formateado en CLP
 * @example
 * formatDiscountPrice(100, 20) // returns "$76.000"
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
 * Formatea un número grande usando notación compacta (K para miles, M para millones)
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado en notación compacta
 * @example
 * formatCompactNumber(1000) // returns "1 K"
 * formatCompactNumber(1500000) // returns "1,5 M"
 */
export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('es-CL', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
}

/**
 * Formatea un número como porcentaje
 * @param {number} value - Valor numérico a formatear (0-100)
 * @returns {string} Valor formateado como porcentaje
 * @example
 * formatPercent(25) // returns "25 %"
 * formatPercent(50.5) // returns "51 %"
 */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value / 100);
}

/**
 * Formatea una calificación numérica con símbolo de estrella
 * @param {number} rating - Calificación numérica (generalmente 0-5)
 * @returns {string} Calificación formateada con un decimal y símbolo de estrella
 * @example
 * formatRating(4.5) // returns "4.5 ★"
 * formatRating(3.2) // returns "3.2 ★"
 */
export function formatRating(rating: number): string {
  return `${rating.toFixed(1)} ★`;
}


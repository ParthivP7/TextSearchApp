
import { Injectable } from '@angular/core';
import { HIGHLIGHT_COLOR_HUE_INCREMENT, HIGHLIGHT_COLOR_LIGHTNESS } from '../../components/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  constructor() {}

  applyHighlight(text: string, queryInputs: string[], highlightColors: string[]): string {
    let highlightedText = text;

    queryInputs.forEach((query, index) => {
      const color = highlightColors[index];
      const queryRegExp = new RegExp(query, 'gi');
      const matches = highlightedText.match(queryRegExp);

      if (matches) {
        matches.forEach(match => {
          const placeholder = `{${index}}`; // Placeholder for the matched text
          highlightedText = highlightedText.replace(match, placeholder);
        });
      }
    });

    queryInputs.forEach((query, index) => {
      const color = highlightColors[index];
      const placeholderRegExp = new RegExp(`\\{${index}\\}`, 'g'); // Escape curly braces
      highlightedText = highlightedText.replace(
        placeholderRegExp,
        `<span style="background-color: ${color};">${query}</span>`
      );
    });

    return highlightedText;
  }

  generateColors(numColors: number): string[] {
    // Generate an array of distinct highlight colors
    const colors: string[] = [];
    const hueIncrement = Math.floor(360 / numColors);

    for (let i = 0; i < numColors; i++) {
      const hue = (i * hueIncrement) % 360;
      const color = `hsl(${hue}, 100%, 80%)`;
      colors.push(color);
    }

    return colors;
  }

  getColor(queryIndex: number): string {
    const hue = (queryIndex * HIGHLIGHT_COLOR_HUE_INCREMENT) % 360;
    return `hsl(${hue}, 100%, ${HIGHLIGHT_COLOR_LIGHTNESS}%)`;
  }
}


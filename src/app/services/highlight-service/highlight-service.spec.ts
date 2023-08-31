import { TestBed } from '@angular/core/testing';
import { HighlightService } from './highlight-service';

describe('HighlightService', () => {
  let service: HighlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('applyHighlight()', () => {
    it('should highlight a single query in text', () => {
      const inputText = 'The quick brown fox';
      const queryInputs = ['quick'];
      const highlightColors = ['#ff0000'];
      const expectedOutput = 'The <span style="background-color: #ff0000;">quick</span> brown fox';

      const result = service.applyHighlight(inputText, queryInputs, highlightColors);

      expect(result).toBe(expectedOutput);
    });

    it('should highlight multiple queries in text', () => {
      const inputText = 'The quick brown fox jumps quickly';
      const queryInputs = ['quick', 'fox'];
      const highlightColors = ['#ff0000', '#00ff00'];
      const expectedOutput = 'The <span style="background-color: #ff0000;">quick</span> brown ' +
        '<span style="background-color: #00ff00;">fox</span> jumps <span style="background-color: #ff0000;">quick</span>ly';

      const result = service.applyHighlight(inputText, queryInputs, highlightColors);

      expect(result).toBe(expectedOutput);
    });
  });

  describe('generateColors()', () => {
    it('should generate distinct colors for the given number', () => {
      const numColors = 3;

      const colors = service.generateColors(numColors);

      expect(colors.length).toBe(numColors);

      // Make sure each color is in the expected format
      colors.forEach(color => {
        expect(color).toMatch(/^hsl\(\d+, 100%, 80%\)$/);
      });
    });
  });

  describe('getColor()', () => {
    it('should generate the correct HSL color for query index', () => {
      const queryIndex = 2;
      const expectedColor = `hsl(${queryIndex * 60 % 360}, 100%, 80%)`;

      const color = service.getColor(queryIndex);

      expect(color).toBe(expectedColor);
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsAreaComponent } from './results-area.component';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TextSearchService } from '../../services/text-search-service/text-search.service';
import { SearchService } from '../../services/search-service/search-service';
import { Store } from '@ngrx/store';
import { HighlightService } from '../../services/highlight-service/highlight-service';

describe('ResultsAreaComponent', () => {
  let component: ResultsAreaComponent;
  let fixture: ComponentFixture<ResultsAreaComponent>;
  let mockTextSearchService: Partial<TextSearchService>;
  let mockSearchService: Partial<SearchService>;
  let mockDomSanitizer: DomSanitizer;
  let mockStore: Partial<Store>;

  beforeEach(() => {
    mockTextSearchService = {
      searchBatch: jest.fn().mockReturnValue(of(['result1', 'result2'])),
      searchOnline: jest.fn().mockReturnValue(of(['result3', 'result4'])),
    };

    mockDomSanitizer = {
      // Mock the bypassSecurityTrustHtml method to return a valid SafeHtml object
      bypassSecurityTrustHtml: (value: string) => mockDomSanitizer.bypassSecurityTrustHtml(value),
    } as DomSanitizer; // Cast to DomSanitizer type

    TestBed.configureTestingModule({
      declarations: [ResultsAreaComponent],
      providers: [
        { provide: TextSearchService, useValue: mockTextSearchService },
        { provide: SearchService},
        { provide: HighlightService},
        { provide: Store, useValue: mockStore },
        { provide: DomSanitizer, useValue: mockDomSanitizer },
      ],
    });
    fixture = TestBed.createComponent(ResultsAreaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

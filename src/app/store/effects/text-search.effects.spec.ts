import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TextSearchEffects } from './text-search.effects';
import * as actions from '../actions/text-search.actions';
import { TextSearchService } from '../../services/text-search-service/text-search.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TextSearchState } from '../text-search.state';


describe('TextSearchEffects', () => {
  let actions$: any;
  let effects: TextSearchEffects;
  let textSearchService: TextSearchService;
  let store: MockStore<TextSearchState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})], // Empty store for testing
      providers: [
        TextSearchEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: TextSearchService,
          useValue: {
            searchBatch: jest.fn(),
          },
        },
      ],
    });
    effects = TestBed.inject(TextSearchEffects);
    textSearchService = TestBed.inject(TextSearchService);
    store = TestBed.inject(Store) as MockStore<TextSearchState>;
  });

    it('should not dispatch any action if search mode is not "batch"', () => {
      actions$ = of(actions.setSearchMode({ mode: 'online' }));

      effects.searchBatch$.subscribe((resultAction: any) => {
        expect(resultAction).toBeUndefined();
      });
    });
  });

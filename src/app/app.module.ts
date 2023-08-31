import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { QueryInputsComponent } from './components/query-inputs/query-inputs.component';
import { ResultsAreaComponent } from './components/results-area/results-area.component';
import { SearchToggleComponent } from './components/search-toggle/search-toggle.component';
import { textSearchReducer } from './store/reducers/text-search.reducers';
import { TextSearchEffects } from './store/effects/text-search.effects';
import { SearchService } from './services/search-service/search-service';
import { TextSearchService } from './services/text-search-service/text-search.service';


@NgModule({
  declarations: [
    AppComponent,
    InputTextComponent,
    QueryInputsComponent,
    ResultsAreaComponent,
    SearchToggleComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    StoreModule.forRoot({ textSearch: textSearchReducer }),
    EffectsModule.forRoot([TextSearchEffects]),
  ],
  providers: [TextSearchService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchToggleComponent } from './search-toggle.component';

describe('SearchToggleComponent', () => {
  let component: SearchToggleComponent;
  let fixture: ComponentFixture<SearchToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchToggleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set searchMode to "batch" initially', () => {
    expect(component.searchMode).toEqual('batch');
  });

  it('should emit modeChanged event with "batch" on batch mode change', () => {
    const emitSpy = jest.spyOn(component.modeChanged, 'emit');
    component.onModeChange('batch');
    expect(emitSpy).toHaveBeenCalledWith('batch');
  });

  it('should emit modeChanged event with "online" on online mode change', () => {
    const emitSpy = jest.spyOn(component.modeChanged, 'emit');
    component.onModeChange('online');
    expect(emitSpy).toHaveBeenCalledWith('online');
  });

  it('should update searchMode on mode change', () => {
    component.onModeChange('online');
    expect(component.searchMode).toEqual('online');
  });
});

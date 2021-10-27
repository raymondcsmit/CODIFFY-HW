import { ThrowStmt } from '@angular/compiler';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Select } from '@ngxs/store';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from "ngx-loading";
import { Observable } from 'rxjs';
import { ILoader, LoaderService } from './service/loader.service';
import { LoaderState } from './store/app.store';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'Unaz App';

  //@Select(LoaderState.status) loadingState$!: Observable<boolean>;
  @ViewChild('ngxLoading', { static: false }) ngxLoadingComponent!: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate!: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  @Select(LoaderState.status) loaderStatus$!: Observable<any>;

  public loading: boolean = false;
  //public primaryColour = PrimaryWhite;
  //public secondaryColour = SecondaryGrey;
  public primaryColour = PrimaryRed;
  public secondaryColour = SecondaryBlue;
  public coloursEnabled = false;
  public loadingTemplate!: TemplateRef<any>;
  public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };

  constructor(private sanitizer: DomSanitizer, private loaderService: LoaderService,private cdRef:ChangeDetectorRef) { }
  ngOnInit(): void {
    this.loaderStatus$?.subscribe(data => {
      console.log("loading state  is :");console.log(data);
      this.loading=data;
     });   

  }
  ngAfterViewChecked()
{
  this.cdRef.detectChanges();
}
}

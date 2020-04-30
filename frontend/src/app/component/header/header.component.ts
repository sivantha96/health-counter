import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  selectedLang: string;
  currentLan: string;

  constructor(public translate: TranslateService, private overlayContainer: OverlayContainer) {
    translate.addLangs(['en', 'si', 'ta']);
    translate.setDefaultLang('en');
  }


  ngOnInit(): void {
    this.currentLan = "English";
  }

  toggleLanguage(language: string): void {
    this.translate.use(language);
    this.selectedLang = language;
    if (this.selectedLang == 'en') {
      this.currentLan = "English";
    } else if (this.selectedLang == 'si') {
      this.currentLan = "සිංහල";
    } else if (this.selectedLang == 'ta') {
      this.currentLan = "தமிழ்";
    }
  }

  closeMyMenu() {
    this.trigger.closeMenu();
  }  

 
 }



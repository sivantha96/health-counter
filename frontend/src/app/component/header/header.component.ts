import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  selectedLang: string;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'si','ta']);
    translate.setDefaultLang('en');
  }
  

  ngOnInit(): void {
  }

  toggleLanguage(language: string): void {
    
    this.translate.use(language);
    this.selectedLang = language;
  }

}

import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideZoneChangeDetection} from "@angular/core";
import {provideRouter} from "@angular/router";
import {ItemsComponent} from "./app/items/items.component";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter([
      {
        path: '',
        component: ItemsComponent
      }
    ]),
    provideAnimations(),
  ]
})
  .catch((err) => console.error(err));

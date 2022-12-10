import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardBodyComponent } from './card-body/card-body.component';
import { CardFlyoutComponent } from './card-flyout/card-flyout.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { CardSubtitleComponent } from './card-subtitle/card-subtitle.component';
import { CardTitleComponent } from './card-title/card-title.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    CardComponent,
    CardBodyComponent,
    CardFlyoutComponent,
    CardHeaderComponent,
    CardFooterComponent,
    CardSubtitleComponent,
    CardTitleComponent
  ],
  exports: [
    CardComponent,
    CardBodyComponent,
    CardFlyoutComponent,
    CardHeaderComponent,
    CardFooterComponent,
    CardSubtitleComponent,
    CardTitleComponent
  ],
})
export class CardModule {}

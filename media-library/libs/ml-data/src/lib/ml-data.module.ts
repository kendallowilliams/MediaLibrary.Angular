import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromConfigurations from './/stores/configurations/configurations.reducer';
import { ConfigurationsEffects } from './/stores/configurations/configurations.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
      fromConfigurations.CONFIGURATIONS_FEATURE_KEY,
      fromConfigurations.configurationsReducer,
    ),
    EffectsModule.forFeature([ConfigurationsEffects]),
  ],
})
export class MlDataModule {}

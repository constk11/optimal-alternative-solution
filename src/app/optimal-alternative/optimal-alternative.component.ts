import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CriteriasService } from '../services/criterias.service';
import { Criteria } from '../shared/interfaces';

@Component({
  selector: 'app-optimal-alternative',
  templateUrl: './optimal-alternative.component.html',
  styleUrls: ['./optimal-alternative.component.scss'],
})
export class OptimalAlternativeComponent implements OnInit {
  public altCount = 2;

  public altCountArr = new Array(this.altCount);

  public riskCount = 1;

  public riskCountArr = new Array(this.riskCount);

  public isGurvic: Criteria | undefined;

  public criterias: Criteria[];

  constructor(
    private readonly criteriasService: CriteriasService,
    private readonly router: Router) {}

  ngOnInit(): void {    
    this.criterias = this.criteriasService.getSelectedCriterias();
    if (!this.criterias?.length) {
      this.router.navigate(['/']);
      return;
    }
    this.isGurvic = this.criterias.find((c) => c.id === 'gurvic');
  }

  public setAltCount(event: Event): void {
    const inputValue = +(event.target as HTMLInputElement).value;
    if (inputValue < 2) {
      return;
    }
    this.altCount = inputValue;
    this.altCountArr = new Array(inputValue);
  }

  public setRiskCount(event: Event): void {
    const inputValue = +(event.target as HTMLInputElement).value;
    if (inputValue < 1) {
      return;
    }
    this.riskCount = inputValue;
    this.riskCountArr = new Array(inputValue);
  }

  public calc() {
    this.clearWins();

    for (let i = 0; i < this.altCount; i++) {
      const values: number[] = [];
      document.querySelectorAll(`.alt${i} input`).forEach((v) => {
        values.push(+(v as HTMLInputElement).value);
      });
      this.calcByCriterias(values, i);
    }

    this.calcMaxValue();
    this.determinateWinner();
  }

  private calcByCriterias(values: number[], rowIndex: number) {
    this.criterias.forEach((criteria) => {
      let criteriaValue;
      if (this.isGurvic) {
        const gurvicCoeff = +(
          document.querySelector('.gurvic-coeff input') as HTMLInputElement
        ).value;
        criteriaValue = this.criteriasService.calc(values, criteria.id, gurvicCoeff);
      } else {
        criteriaValue = this.criteriasService.calc(values, criteria.id);
      }
      (<HTMLElement>(
        document.querySelector(`.alt${rowIndex} .${criteria.id}`)
      )).innerHTML = criteriaValue.toString();
    });
  }

  private calcMaxValue() {
    this.criterias.forEach((criteria) => {
      let values: number[] = [];
      let criteriaElems = document.querySelectorAll(`.${criteria.id}`);
      criteriaElems.forEach((criteria) => values.push(+criteria.innerHTML));
      criteriaElems.forEach((criteria) => {
        if (+criteria.innerHTML === Math.max(...values)) {
          (criteria as HTMLElement).classList.add('win');
        }
      });
    });
  }

  private determinateWinner() {
    let maxScore = 0;
    for (let i = 0; i < this.altCount; i++) {
      if (document.querySelectorAll(`.alt${i} .win`).length > maxScore) {
        maxScore = document.querySelectorAll(`.alt${i} .win`).length;
      }
    }

    for (let j = 0; j < this.altCount; j++) {
      if (document.querySelectorAll(`.alt${j} .win`).length === maxScore) {
        document.querySelector(`.alt${j} td.alt textarea`)
          ?.classList.add('win');
      }
    }
  }

  private clearWins() {
    document.querySelectorAll('.win')
      .forEach((elem) => elem.classList.remove('win'));
  }
}

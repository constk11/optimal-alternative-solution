import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CriteriasService } from '../services/criterias.service';
import { Criteria } from '../shared/interfaces';

@Component({
  selector: 'app-selection-criteria',
  templateUrl: './selection-criteria.component.html',
  styleUrls: ['./selection-criteria.component.scss']
})
export class SelectionCriteriaComponent implements OnInit {

  public criterias: Criteria[]

  constructor(
    private readonly criteriasService: CriteriasService,
    private readonly router: Router  
  ) { }

  ngOnInit(): void {
    this.criterias = this.criteriasService.getCriterias()
  }

  public selectCriteria(event: Event): void {
    const elem = event.target as HTMLElement
    elem.classList.toggle('active')
  }

  public navigateToCalculating(): void {
    let selectedCriterias: string[] = []
    document.querySelectorAll('.criteria.active').forEach(criteria => {
      selectedCriterias.push(criteria.innerHTML.trim())
    })
    if (!selectedCriterias.length) { return }
    this.criteriasService.setCriterias(selectedCriterias)
    this.router.navigate(['/optimal-alternative'])
  }
}

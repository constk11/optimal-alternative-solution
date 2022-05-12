import { Injectable } from "@angular/core";
import { Criteria } from "../shared/interfaces";

@Injectable({
    providedIn: 'root'
})
export class CriteriasService {
    private readonly criterias: Criteria[] = [
        {id: 'maximax', name: 'Правило Максимакса'},
        {id: 'minimax', name: 'Правило Минимакса'},
        // {id: 'savage', name: 'Правило Сэвиджа'},
        {id: 'gurvic', name: 'Правило Гурвича'},
        {id: 'laplas', name: 'Правило Лапласа'}
    ]

    private selectedCriterias: Criteria[]

    constructor() {}

    public getCriterias(): Criteria[] {
        return this.criterias
    }

    public setCriterias(criteriasNames: string[]): void {
        this.selectedCriterias = this.criterias.filter(c => criteriasNames.includes(c.name))
    }

    public getSelectedCriterias(): Criteria[] {
        return this.selectedCriterias
    }

    public calc(values: number[], criteriaId: string, gurvicCoeff: number = 0.5): number {
        switch (criteriaId) {
            case 'maximax':
                return Math.max(...values)
            case 'minimax':
                return Math.min(...values)
            case 'gurvic':
                return +(Math.max(...values) * gurvicCoeff + Math.min(...values) * (1 - gurvicCoeff)).toFixed(1)
            case 'laplas':
                let sum = 0
                values.forEach(v => {
                    sum += v * (1 / values.length)
                })
                return +sum.toFixed(1)
            default:
                return 0
        }
    }
}
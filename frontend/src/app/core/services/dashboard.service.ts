import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  dashboardBaseUrl: string = `${environment.api_url}${environment.dashboard_endpoint}`;
  cardBaseUrl: string = `${environment.api_url}${environment.card_endpoint}`;

  private filterValueSource = new BehaviorSubject('');
  public filterValue = this.filterValueSource.asObservable();

  constructor(private apiSvc: ApiService) {}

  setFilterValue(value: string) {
    this.filterValueSource.next(value);
  }

  getBarChartData(): Observable<any> {
    return this.apiSvc.get(
      `${this.dashboardBaseUrl}${environment.get_bar_chart_data}`
    );
  }

  getPieChartData(): Observable<any> {
    return this.apiSvc.get(
      `${this.dashboardBaseUrl}${environment.get_pie_chart_data}`
    );
  }

  getLineChartData(): Observable<any> {
    return this.apiSvc.get(
      `${this.dashboardBaseUrl}${environment.get_line_chart_data}`
    );
  }

  getDoughnutChartData(): Observable<any> {
    return this.apiSvc.get(
      `${this.dashboardBaseUrl}${environment.get_doughnut_chart_data}`
    );
  }

  getTableData(): Observable<any> {
    return this.apiSvc.get(
      `${this.dashboardBaseUrl}${environment.get_element_table_data}`
    );
  }

  getAllCards(): Observable<any> {
    return this.apiSvc.get(this.cardBaseUrl);
  }
}

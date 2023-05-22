import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  dashboardBaseUrl: string = `${environment.api_url}${environment.dashboard_endpoint}`;

  constructor(private http: HttpClient) {}

  getBarChartData(): Observable<any> {
    return this.http.get(
      `${this.dashboardBaseUrl}${environment.get_bar_chart_data}`
    );
  }

  getPieChartData(): Observable<any> {
    return this.http.get(
      `${this.dashboardBaseUrl}${environment.get_pie_chart_data}`
    );
  }

  getLineChartData(): Observable<any> {
    return this.http.get(
      `${this.dashboardBaseUrl}${environment.get_line_chart_data}`
    );
  }

  getDoughnutChartData(): Observable<any> {
    return this.http.get(
      `${this.dashboardBaseUrl}${environment.get_doughnut_chart_data}`
    );
  }

  getTableData(): Observable<any> {
    return this.http.get(
      `${this.dashboardBaseUrl}${environment.get_element_table_data}`
    );
  }
}

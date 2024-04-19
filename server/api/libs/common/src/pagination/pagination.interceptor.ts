import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationOptions } from './pagination.options';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const sortBy = request.query.sortBy || 'id';  
    const sortOrder = request.query.sortOrder || 'ASC';

    const options: PaginationOptions = {
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    };

    return next.handle().pipe(
      map(data => {
        const responseData = data.data || data;
        const total = data.total;
        const pageCount = Math.ceil(total / limit);

        return {
          page,
          pageCount,
          limit,
          total,
          data: this.sortAndPaginate(responseData, options)
        };
      })
    );
  }

  private sortAndPaginate(data: any[], options: PaginationOptions): any[] {
    return data
      .sort((a, b) => {
        if (a[options.sortBy] < b[options.sortBy]) return options.sortOrder === 'ASC' ? -1 : 1;
        if (a[options.sortBy] > b[options.sortBy]) return options.sortOrder === 'ASC' ? 1 : -1;
        return 0;
      })
      .slice(options.skip, options.skip + options.limit);
  }
}
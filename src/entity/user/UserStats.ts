import { DataSource, ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('u."id"')
      .addSelect('u."reputation"', 'reputation')
      .from('user', 'u'),
})
export class UserStats {
  @ViewColumn()
  id: string;

  @ViewColumn()
  reputation: number;
}

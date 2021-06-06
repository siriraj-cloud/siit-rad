/**
 * Original Ref
 * Used in siit-f  src/pages/Allergy/type-allergy.ts
 */
export type AllergyRes =
  | { status: 200; payload: AllergyQueryRaw[] }
  | {
      status: 404;
    }
  | { status: 400 | 401 | 500; message: string };

/**
 * Original Ref
 * Used in siit-f  src/pages/Allergy/type-allergy.ts
 */
export type AllergyQueryRaw = {
  Category: string | null;
  Type: string | null;
  SubType: string | null;
  InsertTime: string | null;
  Comment: string | null;
};

export const allergyQueryStr = `SELECT
  Category,
  Type,
  SubType,
  CONVERT(char(23), InsertTime,126) as InsertTime,
  Comment
FROM
  dbo.risevent
WHERE
  PID = @hn 
  AND Category IN ( 'COMPLICATION', 'REACTION' )`;

export function trimStringGeneric<T extends { [key: string]: any }>(
  o: T[],
): T[] {
  let tmp: T[] = [];
  o.forEach((e) => {
    (Object.keys(e) as (keyof T)[]).map(
      (k: keyof T) =>
        (e[k] =
          e[k] && typeof e[k] === "string"
            ? (e[k] as string).trim()
            : (e[k] as any)),
    );
    tmp.push(e);
  });
  return tmp;
}

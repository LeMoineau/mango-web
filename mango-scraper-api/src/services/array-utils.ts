export namespace ArrayUtils {
  export function getLastOf<T>(arr: T[]): T {
    return arr[arr.length - 1];
  }
}

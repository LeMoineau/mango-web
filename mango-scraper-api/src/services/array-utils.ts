export namespace ArrayUtils {
  export function getLastOf<T>(arr: T[]): T {
    return arr[arr.length - 1];
  }

  export async function asyncForEach<T>(arr: T[], callback: (t: T) => void) {
    for (let t of arr) {
      callback(t);
    }
  }
}

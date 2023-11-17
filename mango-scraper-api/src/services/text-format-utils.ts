export namespace TextFormatUtils {
  export function formatChapterNumber(chapterNumber: string): string {
    let res = chapterNumber;
    try {
      res = `${Number(res)}`; // to remove left 0 as "045"
    } catch {}
    return res;
  }
}

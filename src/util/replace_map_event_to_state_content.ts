const contentReg = /yield\* gEvent\.map\((.*)\)/gs;

export function replaceMapEventToState(orig: string, newContent: string) {
  console.log(contentReg.test(orig));
  return orig.replace(
    contentReg,
    `yield* gEvent.map(
        nothing
    )`
  );
}

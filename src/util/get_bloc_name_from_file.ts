import { basename } from "path";

export function getBlocNameFromFile(fileName: string) {
  let f = basename(fileName);
  if (f.endsWith("_bloc.dart")) return f.replace("_bloc.dart", "");
  else if (f.endsWith("_state.dart")) return f.replace("_state.dart", "");
  else if (f.endsWith("_event.dart")) return f.replace("_event.dart", "");
}

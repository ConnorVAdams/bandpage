import {
  HighlightAlt,
} from "@mui/icons-material";
import { ElementType } from "react";

interface Icons {
  [name: string]: ElementType<any>;
}

/** Define the icons you need */
export default class IconsAsset {
  public static Imported: Icons = {
    HighlightAlt,
  };
}

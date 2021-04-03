import { TestIds } from "@react-native-firebase/admob";
import { NODE_ENV } from "@env";
import { BANNER_ID, INTERSTITIAL_ID } from "../config.json";

enum AdTypes {
  BANNER = "BANNER",
  INTERSTITIAL = "INTERSTITIAL",
}

function GetAdId(adType: AdTypes): string {
  if (NODE_ENV === "development") {
    return TestIds[adType];
  } else if (NODE_ENV === "production") {
    if (adType === AdTypes.BANNER) {
      return BANNER_ID;
    } else if (adType === AdTypes.INTERSTITIAL) {
      return INTERSTITIAL_ID;
    }
  }

  return TestIds[adType];
}

export { GetAdId, AdTypes };

import {
  ConfigPlugin,
  withEntitlementsPlist,
  withInfoPlist,
} from "expo/config-plugins";

export interface OpenWearablesIOSPluginProps {
  healthShareUsage?: string;
  healthUpdateUsage?: string;
}

const withOpenWearablesIOS: ConfigPlugin<OpenWearablesIOSPluginProps> = (
  config,
  options = {}
) => {
  const {
    healthShareUsage = "Allow access to your health data.",
    healthUpdateUsage = "Allow updates to your health data.",
  } = options;

  // Add HealthKit entitlements
  config = withEntitlementsPlist(config, (config) => {
    config.modResults["com.apple.developer.healthkit"] = true;
    config.modResults["com.apple.developer.healthkit.background-delivery"] =
      true;
    return config;
  });

  // Add Info.plist usage descriptions & BGTask identifiers
  config = withInfoPlist(config, (config) => {
    config.modResults["NSHealthShareUsageDescription"] = healthShareUsage;
    config.modResults["NSHealthUpdateUsageDescription"] = healthUpdateUsage;

    // Merge instead of replace so consumer-set modes (e.g. "remote-notification"
    // for push) survive when this plugin runs.
    const existingBackgroundModes =
      (config.modResults["UIBackgroundModes"] as string[] | undefined) ?? [];

    config.modResults["UIBackgroundModes"] = Array.from(
      new Set([...existingBackgroundModes, "fetch", "processing"])
    );

    const existingBGTaskIdentifiers =
      (config.modResults["BGTaskSchedulerPermittedIdentifiers"] as
        | string[]
        | undefined) ?? [];

    config.modResults["BGTaskSchedulerPermittedIdentifiers"] = Array.from(
      new Set([
        ...existingBGTaskIdentifiers,
        "com.openwearables.healthsdk.task.refresh",
        "com.openwearables.healthsdk.task.process",
      ])
    );

    return config;
  });

  return config;
};

export default withOpenWearablesIOS;

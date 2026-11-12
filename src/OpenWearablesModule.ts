import { NativeModule, requireNativeModule } from "expo-modules-core";
import {
  Endpoints,
  HealthDataType,
  OpenWearablesModuleEvents,
  HealthDataProvider,
  OWLogLevel,
} from "./OpenWearables.types";

declare class OpenWearablesModule extends NativeModule<OpenWearablesModuleEvents> {
  // MARK: - Configure
  /** Throws when an endpoint is not an absolute http(s) URL. */
  configure(endpoints: Endpoints): void;

  // MARK: - Auth
  signIn(
    userId: string,
    accessToken: string | null,
    refreshToken: string | null,
    apiKey: string | null
  ): Promise<void>;
  signOut(): Promise<void>;
  updateTokens(accessToken: string, refreshToken: string): void;
  restoreSession(): string;
  isSessionValid(): boolean;

  // MARK: - HealthKit Authorization
  requestAuthorization(types: HealthDataType[]): Promise<boolean>;

  // MARK: - Sync
  setSyncInterval(minutes: number): void;
  startBackgroundSync(syncDaysBack: number | null): Promise<boolean>;
  stopBackgroundSync(): Promise<void>;
  syncNow(): Promise<void>;
  isSyncActive(): boolean;
  getSyncStatus(): Record<string, any>;
  resumeSync(): Promise<boolean>;
  resetAnchors(): void;
  getStoredCredentials(): Record<string, any | null>;

  // MARK: - Per-type sync
  /** Stops syncing these types and keeps what was already sent. Survives restarts; cleared on sign-out. */
  pauseTypes(types: HealthDataType[]): Promise<void>;
  /** Syncs these types again from where they stopped, or reads their whole history when that's no longer possible. */
  resumeTypes(types: HealthDataType[]): Promise<void>;
  getPausedTypes(): HealthDataType[];
  /** Reads these types' whole history again and uploads it. Resolves once scheduled, not when finished. */
  resyncTypes(types: HealthDataType[]): Promise<void>;

  // MARK: - Providers
  getAvailableProviders(): HealthDataProvider[];
  setProvider(providerId: string): boolean;

  // MARK: - Logs
  setLogLevel(logLevel: OWLogLevel): void;
  getLogLevel(): OWLogLevel;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<OpenWearablesModule>(
  "OpenWearablesHealthSDK"
);

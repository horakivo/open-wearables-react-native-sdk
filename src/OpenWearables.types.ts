export type OpenWearablesModuleEvents = {
  onLog: (params: LogEventPayload) => void;
  onAuthError: (params: AuthErrorEventPayload) => void;
};

export type LogEventPayload = {
  message: string;
};

export type AuthErrorEventPayload = {
  statusCode: number;
  message: string;
};

export enum OWLogLevel {
  None = 0,
  Always = 1,
  Debug = 2,
}

export enum HealthDataType {
  // Activity & Mobility
  Steps = "steps",
  DistanceWalkingRunning = "distanceWalkingRunning",
  DistanceCycling = "distanceCycling",
  DistanceSwimming = "distanceSwimming",
  FlightsClimbed = "flightsClimbed",
  WalkingSpeed = "walkingSpeed",
  WalkingStepLength = "walkingStepLength",
  WalkingAsymmetryPercentage = "walkingAsymmetryPercentage",
  WalkingDoubleSupportPercentage = "walkingDoubleSupportPercentage",
  SixMinuteWalkTestDistance = "sixMinuteWalkTestDistance",
  ActiveEnergy = "activeEnergy",
  BasalEnergy = "basalEnergy",

  // Workout samples. Each platform reads the ids it has a record type for and ignores the
  // rest: HealthKit has sport-specific speed/power, Health Connect has generic ones.
  TotalEnergy = "totalEnergy", // Android
  ElevationGained = "elevationGained", // Android
  SwimmingStrokeCount = "swimmingStrokeCount", // iOS
  Speed = "speed", // Android
  RunningSpeed = "runningSpeed", // iOS 16+
  CyclingSpeed = "cyclingSpeed", // iOS 17+
  Power = "power", // Android
  RunningPower = "runningPower", // iOS 16+
  CyclingPower = "cyclingPower", // iOS 17+
  StepsCadence = "stepsCadence", // Android
  CyclingCadence = "cyclingCadence", // both

  // Heart & Cardiovascular
  HeartRate = "heartRate",
  RestingHeartRate = "restingHeartRate",
  HeartRateVariabilitySDNN = "heartRateVariabilitySDNN",
  Vo2Max = "vo2Max",
  OxygenSaturation = "oxygenSaturation",
  RespiratoryRate = "respiratoryRate",

  // Body Measurements
  BodyMass = "bodyMass",
  Height = "height",
  Bmi = "bmi",
  BodyFatPercentage = "bodyFatPercentage",
  LeanBodyMass = "leanBodyMass",
  WaistCircumference = "waistCircumference",
  BodyTemperature = "bodyTemperature",
  /** Nightly wrist temperature (iOS 16+, Apple Watch Series 8+). Absolute °C. */
  AppleSleepingWristTemperature = "appleSleepingWristTemperature", // iOS
  /** Nightly skin temperature as a delta from the device baseline, °C. */
  SkinTemperature = "skinTemperature", // Android

  // Blood & Metabolic
  BloodGlucose = "bloodGlucose",
  InsulinDelivery = "insulinDelivery",
  BloodPressureSystolic = "bloodPressureSystolic",
  BloodPressureDiastolic = "bloodPressureDiastolic",
  BloodPressure = "bloodPressure",

  // Sleep & Mindfulness
  Sleep = "sleep",
  MindfulSession = "mindfulSession",

  // Reproductive Health
  MenstrualFlow = "menstrualFlow",
  CervicalMucusQuality = "cervicalMucusQuality",
  OvulationTestResult = "ovulationTestResult",
  SexualActivity = "sexualActivity",

  // Nutrition
  DietaryEnergyConsumed = "dietaryEnergyConsumed",
  DietaryCarbohydrates = "dietaryCarbohydrates",
  DietaryProtein = "dietaryProtein",
  DietaryFatTotal = "dietaryFatTotal",
  DietaryWater = "dietaryWater",

  // Workout
  Workout = "workout",

  // Aliases
  RestingEnergy = "restingEnergy",
  BloodOxygen = "bloodOxygen",
}

export type HealthDataProvider = {
  id: string;
  displayName: string;
  isAvailable: boolean;
};

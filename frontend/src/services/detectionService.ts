export type Detection = {
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SpatialDescription = {
  label: string;
  horizontal: "left" | "center" | "right";
  distance: "near" | "medium" | "far";
};

/**
 * Integration boundary for a future local YOLO/ONNX detector.
 * Intentionally returns no fake detections.
 */
export async function detectObjects(_image: ImageData | HTMLVideoElement): Promise<Detection[]> {
  return [];
}

export function mapToSpatialLanguage(d: Detection, frameWidth: number, frameHeight: number): SpatialDescription {
  const centerX = d.x + d.width / 2;
  const horizontal = centerX < frameWidth * 0.36 ? "left" : centerX > frameWidth * 0.64 ? "right" : "center";
  const area = (d.width * d.height) / (frameWidth * frameHeight);
  const distance = area > 0.18 ? "near" : area > 0.06 ? "medium" : "far";
  return { label: d.label, horizontal, distance };
}
import type { Paths } from "../types/combinedURLScheme.js"

type Severity = Paths.GetMilkingVisits.Responses.Default["errors"][0]["severity"]

export const icarBatchResultSeverityType: Record<Severity, Severity> = {
    Information: "Information",
    Warning: "Warning",
    Error: "Error"
}

import { randomUUID } from "crypto";
import { request } from "http";

interface MetricsState {
  failures: number;
  latencies : number[];
  statusCodes : Map<string, number>;
  circuitOpenUntil:number | null;
}

const metricsStore : Record<string, MetricsState> = {};

export function recordRequest(requestId:string, method:string, url:string, startTime:number){
  //initializing the object per request
  metricsStore[requestId] = {
    failures:0,
    latencies:[],
    statusCodes: new Map(),
    circuitOpenUntil: null
  }
}

export function recordStatus(requestId: string, statusGroup: string){
   if (!metricsStore[requestId]) return;
   const count = metricsStore[requestId].statusCodes.get(statusGroup) || 0;
   metricsStore[requestId].statusCodes.set(statusGroup,count+1);
}

export function recordLatency(requestId: string, latency: number) {
  if (!metricsStore[requestId]) return;
  metricsStore[requestId].latencies.push(latency);
}

export function recordFailure(requestId: string) {
  if (!metricsStore[requestId]) return;
  metricsStore[requestId].failures++;
}

export function getFailures(requestId: string): number {
  return metricsStore[requestId]?.failures || 0;
}

export function isCircuitOpen(requestId: string) : boolean{
    const state = metricsStore[requestId];

    if(!state) return false;

    if(state.circuitOpenUntil && Date.now() < state.circuitOpenUntil)
    {
      return true;
    }

    state.circuitOpenUntil = null;
    return false;
}

export function openCircuit(requestId: string, until: number) {
  metricsStore[requestId].circuitOpenUntil = until;
}

export function getMetrics(requestId: string) {
  const state = metricsStore[requestId];
  if (!state) return null;
  
  return {
    failures: state.failures,
    avgLatency: state.latencies.length 
      ? (state.latencies.reduce((a, b) => a + b, 0) / state.latencies.length)
      : 0,
    statusCodes: Object.fromEntries(state.statusCodes),
    circuitState: state.circuitOpenUntil ? "OPEN" : "CLOSED",
    circuitTimeout: state.circuitOpenUntil ? 
      Math.ceil((state.circuitOpenUntil - Date.now()) / 1000) : 0
  };
}

export function cleanupOldMetrics(maxAgeMs = 24 * 60 * 60 * 1000) {
  const now = Date.now();
  for (const requestId in metricsStore) {
    if (now - (metricsStore[requestId].latencies[0] || 0) > maxAgeMs) {
      delete metricsStore[requestId];
    }
  }
}
// Per-requestId metrics tracking
// Circuit breaker (3 fails → OPEN 10s)
// Latency histogram 
// Status code buckets (2xx/4xx/5xx)
// Auto-cleanup
// getMetrics() for debugging
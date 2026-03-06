let totalRequests = 0
let successRequests = 0
let errorRequests = 0
let totalLatency = 0

export function recordRequest(status: number, latency: number) {
  totalRequests++
  totalLatency += latency

  if (status >= 400) errorRequests++
  else successRequests++
}

export function metrics() {
  return `
http_requests_total ${totalRequests}
http_requests_success ${successRequests}
http_requests_error ${errorRequests}
avg_response_time_ms ${totalRequests ? totalLatency / totalRequests : 0}
`
}
// Never log raw driver messages: they can contain connection strings or credentials.
export function describeIdeasFailure(error) {
  const nested = [error, error?.cause, ...Array.from(error?.reason?.servers?.values?.() || [], server => server.error)].filter(Boolean)
  const messages = nested.map(item => String(item.message || "")).join(" ")
  const codes = nested.map(item => item.code)
  if (codes.includes(18) || /authentication failed|bad auth/i.test(messages)) return "mongo-authentication-failed"
  if (codes.includes(13)) return "mongo-permission-denied"
  if (codes.includes(11000)) return "mongo-duplicate-index-data"
  if (nested.some(item => item.name === "MongoParseError")) return "mongo-invalid-connection-string"
  if (/ENOTFOUND|ENODATA|querySrv/i.test(messages)) return "mongo-dns-failed"
  if (/certificate|TLS|SSL/i.test(messages)) return "mongo-tls-failed"
  if (nested.some(item => item.name === "MongoServerSelectionError") || /timed out|ECONNREFUSED|ECONNRESET/i.test(messages)) return "mongo-server-unreachable"
  return "ideas-operation-failed"
}

export function reportIdeasFailure(operation, error) {
  const allowedOperations = ["load-board", "submit", "moderate"]
  console.error("[ideas]", JSON.stringify({
    operation: allowedOperations.includes(operation) ? operation : "unknown",
    reason: describeIdeasFailure(error),
  }))
}

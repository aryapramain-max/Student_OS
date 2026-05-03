{
  "version": 2,
  "rewrites": [
    {
      "source": "/v2/:path*",
      "destination": "/api"
    },
    {
      "source": "/auth/:path*",
      "destination": "/api"
    },
    {
      "source": "/privacy",
      "destination": "/api"
    },
    {
      "source": "/",
      "destination": "/api"
    }
  ]
}
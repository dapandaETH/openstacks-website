export async function onRequest({ request }) {
  const targetUrl = new URL(request.url);
  const path = targetUrl.pathname.replace(/^\/chat/, '') || '/';
  const query = targetUrl.search;

  const target = `http://139.180.142.215:4000${path}${query}`;

  const response = await fetch(target, {
    method: request.method,
    headers: {
      ...Object.fromEntries(
        [...request.headers].filter(([key]) =>
          !['host', 'connection'].includes(key.toLowerCase())
        )
      ),
      'X-Forwarded-Host': targetUrl.host,
    },
    body: request.body,
    redirect: 'manual',
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers([...response.headers]),
  });
}
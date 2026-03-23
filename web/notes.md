## Web Toolbox

Open http://localhost:3000 in Chrome with DevTools Network open. Reload. Compare the document response body to what curl -i returned for the same URL. Are they identical byte-for-byte? If not, explain what accounts for the difference.

 - Difference in user agent vals
 - > User-Agent: curl/7.81.0
 - > User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36



Add console.log('Request received for /', req.method) inside the / route handler. Make a request from the browser and a separate request from curl. Observe: where do the two logs appear? Are they in the same place?
- Node.js prints logs to the terminal, both in terminal
- Browser DevTools only shows client-side JS logs

Change app.listen(3000, ...) to app.listen(4000, ...). Confirm that curl http://localhost:3000 now fails and curl http://localhost:4000 succeeds. Write one sentence describing what the error message tells you.
- curl: (7) Failed to connect to localhost port 3000 after 5 ms: Connection refused


Delete node_modules. Try to start the server. Read the error. Restore dependencies with bun install and verify the server starts.
-  Local package.json exists, but node_modules missing, did you mean to install?


## URL Lifecycle
For each request, write one sentence: who initiated it and why.
- time	200	fetch	learn.js:8	0.3 kB	56 ms - the call was made from learn.js
- localhost	304	document	Other	0.3 kB	37 ms - the browser cannot trace the origin
- learn.js	304	script	(index):8	0.3 kB	27 ms - the call for the resource was made from learn.html (displayed as - index file present at root /)
- learn.css	304	stylesheet	(index):7	0.3 kB	12 ms


Trace one redirect chain.
Visit a URL that redirects (for example http://example.com).
In Network, follow each hop until final 200.
Record original URL, final URL, and redirect status codes.

- example	301	document / Redirect	Other	0.3 kB	1.18 s
- example	301	document / Redirect	iana.org/domains/example	1.0 kB	1.29 s
- example-domains	307	document / Redirect	/domains/example	0.0 kB	8 ms
- example-domains	200	document	/help/example-domains

- Original URL - https://iana.org/domains/example
- Final URL - https://www.iana.org/help/example-domains


## HTTP in Practice

Why can curl succeed while browser fetch fails?
- Curl has no CORS restriction 
- In case the fetch misses sending cookies 
  
When do cookies appear under Application but not in JavaScript?
- Cookies are HTTPOnly, so that Js cannnot read auth cookies

How do you prove whether the bug is in client mapping vs server response?
- If 


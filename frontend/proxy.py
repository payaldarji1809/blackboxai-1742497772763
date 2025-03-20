from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.request
from urllib.error import URLError
import socket

class ProxyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        try:
            # Forward request to React dev server
            url = f'http://localhost:3001{self.path}'
            response = urllib.request.urlopen(url)
            
            # Copy response headers
            self.send_response(response.status)
            for header, value in response.getheaders():
                if header.lower() != 'transfer-encoding':
                    self.send_header(header, value)
            self.end_headers()
            
            # Copy response body
            self.wfile.write(response.read())
            
        except URLError:
            # If React server is not reachable, return 502 Bad Gateway
            self.send_response(502)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'Error: Could not reach React development server')
        except Exception as e:
            # For any other error, return 500 Internal Server Error
            self.send_response(500)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(str(e).encode())

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, ProxyHandler)
    print('Starting proxy server on port 8000...')
    httpd.serve_forever()
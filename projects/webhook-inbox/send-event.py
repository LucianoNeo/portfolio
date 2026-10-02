"""Send a fictional signed webhook to the local lab. Python standard library only."""
import argparse, hashlib, hmac, json, os, time, urllib.request, urllib.parse

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://localhost:5083')
parser.add_argument('--id', default='demo-1')
parser.add_argument('--kind', default='points.awarded')
args = parser.parse_args()
body = json.dumps({'type': args.kind, 'player': 'neo', 'points': 25}, separators=(',', ':')).encode()
timestamp = str(int(time.time()))
secret = os.environ.get('WebhookSecret', 'local-demo-webhook-secret')
signature = hmac.new(secret.encode(), timestamp.encode()+b'.'+args.id.encode()+b'.'+body, hashlib.sha256).hexdigest()
request = urllib.request.Request(args.url+'/webhooks', data=body, headers={'Content-Type':'application/json','X-Event-Id':args.id,'X-Timestamp':timestamp,'X-Signature':signature})
with urllib.request.urlopen(request) as response:
    print('Intake:', response.status, response.read().decode())
for _ in range(30):
    request = urllib.request.Request(args.url+'/events/'+urllib.parse.quote(args.id, safe=''), headers={'X-Admin-Key':os.environ.get('AdminKey','local-demo-admin-key')})
    with urllib.request.urlopen(request) as response:
        state = json.load(response)
    if state['status'] in ('Completed','DeadLetter'):
        print('Processing:', json.dumps(state)); break
    time.sleep(.5)
else:
    raise SystemExit('Event is still pending; check worker configuration and logs.')

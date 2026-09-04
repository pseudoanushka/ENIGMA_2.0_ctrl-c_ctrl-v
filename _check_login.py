from fastapi.testclient import TestClient 
import main 
c=TestClient(main.app) 
r=c.post('/login',json={'email':'test@example.com','password':'123456789'}) 
print(r.status_code) 
print(r.text[:300]) 

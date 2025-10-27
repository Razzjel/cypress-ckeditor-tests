# Requirements:
To use proxy, prepare .env file with following variables with data from Customer Portal
- API_SECRET 
- ORGANIZATION_ID 
- ENVIRONMENT_ID 

This allows proxy to access Cloud Services API and redirect request correctly.

npm needs to be installed

# How to start:

npx start

After starting, application will inform that it's working on port specified in variable.

# Request example:
- Flush
http://localhost:9001/flush?document_id=document-1
- Users
http://localhost:9001/users?document_id=document-1
- Comments
http://localhost:9001/comments
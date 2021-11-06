# pubsub-email-notification-publisher
This is a microservice using google pub/sub message broker to publish real time event. 

## Prerequisite 
you need to enable google pub/sub api in your GCP
you need to generate key role json file (key.json) with pub/sub publisher role
put this key.json file in your root directory

### .env
set GOOGLE_APPLICATION_CREDENTIALS=./key.json. This key file is that you generated on your google account. While you create the key.json file only use the role for publishing. 

## start the service 
* `npm install`

* `npm run start`

# API 
`POST: http://127.0.0.1:2525/ `

`body {
    "email" : "someone@example.com",
    "subject": "beautiful subject",
    "message": " Mr x, you are lucky, you are the winner !"
}

if your email notification subscription microservice is running , it will going to receive this email event and will sent it as the event message. 

you can experment google pub/sub features using this scafolding. 

Author 

Awet with love !



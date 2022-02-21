# learn-rabbitmq

# Create rabbit mq via docker
```
docker run -d -p 15672:15672 -p 5672:5672 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=password --name rabbitmq rabbitmq:3-management
```

# Create queue
```
node producer.js
```

# Create worker node
```
node consumer.js
```
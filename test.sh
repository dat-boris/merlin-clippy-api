# The post endpoint
curl -H "Content-Type: application/json" -X POST \
    -d '{"message":"Find me some eye of newt please"}' http://localhost:3000/talk
echo
# exploring
curl -H "Content-Type: application/json" -X POST \
    -d '{"message":"looking for something"}' http://localhost:3000/talk/
echo
# looking for something
curl -H "Content-Type: application/json" -X POST \
    -d '{"message":"add to cart"}' http://localhost:3000/talk/
echo

# The post endpoint
curl -H "Content-Type: application/json" -X POST \
    -d '{"message":"Find me some eye of newt please"}' https://mobify-merlin-clippy.herokuapp.com/talk
echo
curl -H "Content-Type: application/json" -X POST \
    -d '{"message":"add to cart"}' http://mobify-merlin-clippy.herokuapp.com/talk
echo

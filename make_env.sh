echo "Generating .env"
echo "
PORT=$PORT
JWT_SECRET=$JWT_SECRET
DB_HOST=$DB_HOST
DB_USERNAME=$DB_USERNAME
DB_PASSWORD=$DB_PASSWORD
DB_PORT=$DB_PORT
DB_NAME=$DB_NAME
VIRTUAL_HOST=$VIRTUAL_HOST
" > .env
echo "Making docker-compose"
docker-compose up -d --build
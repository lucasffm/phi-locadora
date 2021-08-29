FOLDER=phi-locadora
if test ! -d "$FOLDER"; then
  echo "$FOLDER not exists, clone project!!"
  git clone git@github.com:lucasffm/phi-locadora.git
fi

cd phi-locadora
echo "Pulling from github"
git pull

FILE=.env
if test -f "$FILE"; then
    echo "$FILE exists."
    rm .env
fi

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
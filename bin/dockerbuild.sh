#!/bin/bash

echo Cleaning...
rm -rf ./dist


if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

export GITHUB_URL=$(echo $GIT_URL)

echo Building app
grunt
gruntexitcode=$?
if [ $gruntexitcode != 0 ]; then
    echo "grunt exited with error code $gruntexitcode"
    exit $gruntexitcode
fi

cat > ./dist/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

cat > ./dist/public/version.html << _EOF_
<!doctype html>
<head>
   <title>TicTacToe version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_

cp ./Dockerfile ./dist/
mv 'TESTS-Firefox_38.0.0_(Linux_0.0.0).xml' ./dist/

cd dist
npm install --production
npmexitcode=$?
if [ $npmexitcode != 0 ]; then
    echo "npm install exited with error code $npmexitcode"
    exit $npmexitcode
fi

echo "Building docker image"
sudo service docker start
docker build -t ironpeak/tictactoe:$GIT_COMMIT .
buildexitcode=$?
if [ $buildexitcode != 0 ]; then
    echo "docker build exited with error code $buildexitcode"
    exit $buildexitcode
fi

echo "Pushing docker image"
docker push ironpeak/tictactoe:$GIT_COMMIT
pushexitcode=$?
if [ $pushexitcode != 0 ]; then
    echo "docker push exited with error code $pushexitcode"
    exit $pushexitcode
fi

echo "Done"

exit 0


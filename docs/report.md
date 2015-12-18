TicTacToe - Skýrsla
===================
Í þessu skjali verður farið yfir hluti sem tengjast þróunn leikjarins.

# Tól
## Vagrant
Vagrant er notað til að búa til og stilla þróunar umhverfi, í þessu verkefni sér það um að sýndarvélarnar sé allar eins settar upp. Þetta sér um að kerfið geti alltaf keyrt á því umhverfi sem á að gefa það út á ekkert meira "works on my machine".
## Virtualbox
Virtualbox er notað til að búa til og keyra sýndarvélar, í þessu verkefni er virtualbox notað af vagrant til að keyra sýndarvélarnar.
## Grunt
Grunt er notað til þess að sjálfvirknivæða hluti til þess að það ekki þurfi að gera þá handvirkt, í þessu verkefni er grunt notað til að sjálfvirknivæða ýmsa hluti eins og prófanir og þjöppun.
## Npm
Npm auðveldar manni að halda utan um og að ná í node.js pakka. Þetta er notað til þess að auðvelt sé að ná í pakka sem þarf til að forritið keyri, einnig er þetta mjög góð skjölun þar sem hægt er að sjá lista af nodejs pökkum sem þarf til þess að kerfið keyri.
## NodeJS
NodeJS er keyrslu umhverfi sem virkar á milli kerfa til að þróa net forrit, í þessu verkefni notum við nodejs til þess að þróa tictactoe leik.
## Bower
Bower heldur utan um pakka fyrir framenda og gerir það auðvelt að stjórna útgáfu og sækja pakka, í þessu verkefni er bower notað til þess að halda utan um hvaða pakkar eru notaðir í leiknum og gera það auðvelt að installa þeim. Eins og npm er bower gott til að halda utan um alla pakka sem kerfið notar.
## Docker
Docker er notað til að byggja hugbúnað, í þessu verkefni erum við að nota það til þess að geyma "myndirnar" sem verða til þegar kerfið er þýtt. Þetta er gott til þess að halda utan um allar útgáfur af kerfinu og passa uppá að "myndin" sem var byggð sé bara þýdd einu sinni og alltaf sé notuð sama "myndin".

# Deployment Path
Here we talk about the things that happen when deploying the game.
## Pipeline
After a change has been pushed into version control the code goes through a series of stages before it can be deployed to production.
It is worth noting that the stages that are triggered by the commit stage are loading the git revision hash from the artifact repository plugin.
### Stage 1 - commit
The first stage of the pipeline is the commit stage, this is were we install dependencies necessary for compilation, run unit tests and create a binary that can be deployed. Additionally we are using an artifact plugin that stores our git revision hash between stages.

Here are the script that are run by our Jenkins CI server in the commit stage:

jenkins-commit.sh
``` shell
#!/bin/bash

echo 'Starting jenkins shell script'

export PATH=/usr/local/bin:$PATH;
export DISPLAY=:0

npm install
npmexitcode=$?
if [ $npmexitcode != 0 ]; then
  echo "npm install exited with error code $npmexitcode"
  exit $npmexitcode
fi

bower install
bowerexitcode=$?
if [ $bowerexitcode != 0 ]; then
  echo "bower install exited with error code $bowerexitcode"
  exit $bowerexitcode
fi

./bin/dockerbuild.sh
buildexitcode=$?
if [ $buildexitcode != 0 ]; then
  echo "Dockerbuild exited with error code $buildexitcode"
  exit $buildexitcode
fi

echo 'Finished jenkins shell script'

exit 0
```

dockerbuild.sh
``` shell
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
```

### Stage 2 - acceptance
The second stage of the pipeline is the acceptance stage, this is were we deploy the binary from the previous stage on the the production test environment and runs acceptance tests on it.

Here are the script that are run by our Jenkins CI server in the acceptance stage:

jenkins-acceptance.sh
``` shell
#!/bin/bash

export PATH=/usr/local/bin:$PATH;
export DISPLAY=:0
export ACCEPTANCE_URL=192.168.50.4:8080
GIT_UPSTREAM_HASH=$(<dist/githash.txt)

npm install
npmexitcode=$?
if [ $npmexitcode != 0 ]; then
  echo "npm install exited with error code $npmexitcode"
  exit $npmexitcode
fi

bower install
bowerexitcode=$?
if [ $bowerexitcode != 0 ]; then
  echo "bower install exited with error code $bowerexitcode"
  exit $bowerexitcode
fi

./bin/dockerdeploy.sh $GIT_UPSTREAM_HASH 8080
deployexitcode=$?
if [ $deployexitcode != 0 ]; then
  echo "deploy exited with error code $deployexitcode"
  exit $deployexitcode
fi

grunt mochaTest:acceptance
acceptanceexitcode=$?
if [ $acceptanceexitcode != 0 ]; then
  echo "Acceptance tests exited with error code $acceptanceexitcode"
  exit $acceptanceexitcode
fi

exit 0
```

dockerdeploy.sh
``` shell
#!/bin/bash

echo "Running revision $1 on port $2"

echo -e '\nPulling from docker'
ssh vagrant@192.168.50.4 "docker pull ironpeak/tictactoe:$1"
pulldocker=$?
if [ $pulldocker != 0 ]; then
    echo "docker pull failed with error code $pulldocker"
    exit $pulldocker
fi

echo -e '\nKilling and removing current'
ssh vagrant@192.168.50.4 "(docker kill production$2; docker rm production$2;)"

echo -e '\nDeploying'
ssh vagrant@192.168.50.4 "docker run -p $2:8080 -d -e NODE_ENV=production --name production$2 ironpeak/tictactoe:$1"
rundocker=$?
if [ $rundocker != 0 ]; then
    echo "docker run failed with error code $rundocker"
    exit $rundocker
fi

echo -e '\nDone'

exit 0
```
If jenkins-acceptance.sh exits with an error code the stage fails the following stages are not triggered.

### Stage 3 - capacity
The third stage of the pipeline is the capacity stage, this is were we run capacity tests on the server that was deployed in the previous stage.

Here are the script that are run by our Jenkins CI server in the capacity stage:

jenkins-capacity.sh
``` shell
#!/bin/bash

export DISPLAY=:0
export PATH=/usr/local/bin:$PATH;
export ACCEPTANCE_URL=192.168.50.4:8080

npm install
npmexitcode=$?
if [ $npmexitcode != 0 ]; then
  echo "npm install exited with error code $npmexitcode"
  exit $npmexitcode
fi

bower install
bowerexitcode=$?
if [ $bowerexitcode != 0 ]; then
  echo "bower install exited with error code $bowerexitcode"
  exit $bowerexitcode
fi

grunt mochaTest:load
capacityexitcode=$?
if [ $capacityexitcode != 0 ]; then
  echo "Capacity tests exited with error code $capacityexitcode"
  exit $capacityexitcode
fi

exit 0
```

If you want to know more about the capacity tests, read the next chapter.

If jenkins-capacity.sh exits with an error code the stage fails the following stages are not triggered.

### Stage 4 - deploy
The final stage of the pipeline is the deploy stage, this is were we deploy the binary into our production environment.

Here are the script that are run by our Jenkins CI server in the deploy stage:

jenkins-deploy.sh
``` shell
#!/bin/bash

GIT_UPSTREAM_HASH=$(<dist/githash.txt)

echo "Starting jenkins deploy script"

./bin/dockerdeploy.sh $GIT_UPSTREAM_HASH 9090
deployexitcode=$?
if [ $deployexitcode != 0 ]; then
  echo "deploy exited with error code $deployexitcode"
  exit $deployexitcode
fi

echo "jenkins deploy script finished"

exit 0
```

# Capacity Tests

Created a capacity test that I run on it's own stage in Jenkins, the test plays a 100 games to a draw.
In most runs of the capacity test, it took 8 seconds to complete a 100 games with the highest taking 12 seconds. As a result my capacity test players a 100 games and succeeds if the test run in less then 12 seconds.

Each of the 100 test game that is played by the capacity test is running in parallel of each other, but the commands of each tests are sent to the server asynchronously so each command has to be finished by the server before the next one is sent. The server will receive commands from the test games and put them on the event queue to be processed one at a time in order of arrival.

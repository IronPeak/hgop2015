echo Running revision $2 on port $1

<<<<<<< HEAD
docker kill tictactoe
docker rm tictactoe
docker pull ironpeak/tictactoe:$2
docker run -p 8080:$1 -d --name tictactoe -e "NODE_ENV=production" ironpeak/tictactoe:$2
=======
docker kill tictactoe$1
docker rm tictactoe$1
docker pull gulli/tictactoe:$2
docker run -p $1:8080 -d --name tictactoe$1 -e "NODE_ENV=production" gulli/tictactoe:$2
>>>>>>> 1046ec45fe04aad6d6683043965b05f827b6e800

TicTacToe - Skýrsla
===================
Í þessu skjali verður farið yfir hluti sem tengjast þróunn leikjarins svo sem tól sem varða drefingu.

# Tól
## Vagrant
Vagrant er notað til að búa til og stilla þróunar umhverfi, í þessu verkefni sér það um að sýndarvélarnar sé allar eins settar upp. Þetta sér um að kerfið geti alltaf keyrt á því umhverfi sem á að gefa það út á ekkert meira "works on my machine".
## Virtualbox
Virtualbox er notað til að búa til og keyra sýndarvélar, í þessu verkefni er virtualbox notað af vagrant til að keyra sýndarvélarnar.
## Grunt
Grunt er notað til þess að sjálfvirknivæða hluti til þess að það ekki þurfi að gera það handvirkt, í þessu verkefni er grunt notað til að sjálfvirknivæða ýmsa hluti eins og prófanir og þjöppun.
## Npm
Npm auðveldar manni að halda utan um og að ná í node.js pakka. Þetta er notað til þess að auðvelt sé að ná í pakka sem þarf til að forritið keyri, einnig er þetta mjög góð skjölun þar sem hægt er að sjá lista af nodejs pökkum sem þarf til þess að kerfið keyri.
## NodeJS
NodeJS er keyrslu umhverfi sem virkar á milli kerfa til að þróa net forrit, í þessu verkefni notum við nodejs til þess að þróa tictactoe leik.
## Bower
Bower heldur utan um pakka fyrir framenda og gerir það auðvelt að stjórna útgáfu og sækja pakka, í þessu verkefni er bower notað til þess að halda utan um hvaða pakkar eru notaðir í leiknum og gera það auðvelt að installa þeim. Eins og npm er bower gott til að halda utan um alla pakka sem kerfið notar.
## Docker
Docker er notað til að byggja hugbúnað, í þessu verkefni erum við að nota það til þess að geyma "myndirnar" sem verða til þegar kerfið er þýtt. Þetta er gott til þess að halda utan um allar útgáfur af kerfinu og passa uppá að "myndin" sem var byggð sé bara þýdd einu sinni og alltaf sé notuð sama "myndin".

# Dreifing
Hérna verður farið í þá hluti sem þarf að framkvæma til þess að koma hugbúnaðinum í drefingu.
## Pípan
Hægt er að koma hugbúnaðinum í dreifingu með því að runna deployment scriptunni (deploy.sh). Deployment scriptan byrjar á því að slökkva á öllum sýndarvélum sem eru að keyra á vélinni, keyrir svo upp vagrant sýndarvélina á þróunar vélinni og pushar myndinni á dockerhub. Eftir það setur hún upp imagið sem við vorum að pusha inn á dreifingar þjóninum sem er einnig á þróunar vélinni.

## Kröfur
Til þess að hægt sé að koma hugbúnaðinum í drefingu eru nokkrar kröfur sem þarf að uppfilla áður:
* Þýða hugbúnaðinn (ef eitthvað er).
* Keyra eininga prófanir.
* Keyra sameini prófanir.

## Auka
Í verkefnum utan skóla væri drefingar þjóninn ekki á þróunar vélinni en hér er þetta gert upp á þægindi í verkefna vinnu, þar sem ekki er búst við því að það séu neinir notendur á hugbúnaðinum.

# Capacity Tests

Created a capacity test that I run on it's own stage in Jenkins, the test plays a 1000 games to a draw.
In most runs of the capacity test, it took 3,6 seconds to complete a 1000 games with the highest taking 4,6 seconds. As a result my capacity test players a 1000 games and succeeds if the test run in less then 6 seconds.

Both NodeJS and the capacity tests are running in parallel of each other (they are not even on the same VM so it would make no sense for them to run asynchronously).

The capacity tests them self are run asynchronously since we want each capacity test to run idempotent of each other and adding a test would put more strain on the system if the were running in parallel meaning other test would have to be updated.

NodeJS is a single threaded and asynchronous by nature, so it's processing each request from the capacity test before moving on to the next one.

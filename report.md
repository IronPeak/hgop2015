# TicTacToe - Skýrsla
Í þessu skjali verður farið yfir hluti sem tengjast þróunn leikjarins svo sem tæki, tól og hluti sem varða drefingu.

# Tæki og tól
* Vagrant - er tól sem er notað til að búa til og stilla þróunar umhverfi, í þessu verkefni sér það um að sýndarvélarnar sé allar eins settar upp.
* Virtualbox - er notað til að búa til og keyra sýndarvélar, í þessu verkefni er virtualbox notað af vagrant til að keyra sýndarvélarnar.
* Grunt - notað til þess að sjálfvirknivæða hluti til þess að það ekki þurfi að gera það handvirkt, í þessu verkefni er grunt notað til að sjálfvirknivæða ýmsa hluti eins og prófanir og þjöppun.
* npm - það auðveldar manni að halda utan um og að ná í node.js pakka, í þessu verkefni eru það notað í það.
* nodejs - Keyrslu umhverfi sem virkar á milli kerfa til að þróa net forrit, í þessu verkefni notum við nodejs til þess að þróa tictactoe leik.
* bower - heldur utan um pakka fyrir framenda og gerir það auðvelt að stjórna útgáfu og sækja pakka, í þessu verkefni er bower notað til þess að halda utan um hvaða pakkar eru notaðir í leiknum og gera það auðvelt að installa þeim.
* docker - notað til að byggja og gefa út hugbúnað, í þessu verkefni erum við að nota það í það.

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

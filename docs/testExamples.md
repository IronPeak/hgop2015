Test Examples
=============
# Intoductions
This is a brief documentations of the tests that are run on the system while it's traveling through the pipeline.

Unit Tests
==========
## TicTacToe
In my tictactoe implementation the X is the one who creates the game and O is the one who joins.

### Create Game

    * Scenario: User creates a new game  
        Given nothing  
        When a user creates create a game  
        Then a game is created

    * Scenario: User creates a new game without an id
        Given nothing  
        When a user creates create a game without an id
        Then a game is not created

    * Scenario: User creates a new game without a name
        Given nothing  
        When a user creates a game without a name
        Then a game is not created

    * Scenario: Game id's must be unique
        Given a game has been created  
        When a user creates a game with same id  
        Then a game is not created

### Join Game

    * Scenario: User joins a game  
        Given a game has been created
        When a user joins the game
        Then the user is a part of the game

    * Scenario: User joins a non existing game
        Given nothing  
        When a user joins a non existing game
        Then nothing happens

    * Scenario: User joins a game without a user name
        Given a game has been created
        When a user joins a game without a user name
        Then nothing happens

### Make Move

    * Before each:
        A game has been created
        A game has been joined

    * Scenario: User X makes a move
        Given nothing
        When a X makes move (1, 1)
        Then move X is made in (1, 1)

    * Scenario: User O makes second move
        Given user X has made move (0, 0)
        When user O makes move (1, 1)
        Then move O is made in (1, 1)

    * Scenario: User can not make a move in a filled spot
        Given user X has made move (0, 0)
        When user O makes a move in (0, 0)
        Then nothing happens

    * Scenario: User can not make a move in a filled spot
        Given X in (0, 0), O in (1, 1) and X in (2, 2)
        When user O makes a move in (1, 2)
        Then move O is made in (1, 2)

### Game Draw

    * Scenario: Game results in a draw 1
        Given a game has been created, joined, X in (0, 0),
        O in (1, 0), X in (2, 0), O in (0, 1), X in (1, 1),
        O in (0, 2), X in (2, 1), O in (2, 2)
        When user X makes a move in (1, 2)
        Then game results in a draw

    * Scenario: Game results in a draw 2
        Given a game has been created, joined, X in (1, 0),
        O in (0, 0), X in (1, 1), O in (2, 0), X in (2, 1),
        O in (0, 1), X in (0, 2), O in (1, 2)
        When user X makes a move in (2, 2)
        Then game results in a draw

### Player X Wins

    * Scenario: Game results in a Draw
        Given a game has been created, joined, X in (0, 0),
        O in (2, 1), X in (2, 0), O in (0, 1), X in (1, 1),
        O in (0, 2), X in (1, 2), O in (2, 2)
        When user X makes a move in (1, 0)
        Then user X wins

### Player O Wins

    * Scenario: Game results in a Draw
        Given a game has been created, joined, X in (0, 0),
        O in (1, 1), X in (2, 0), O in (1, 0), X in (2, 2)
        When user O makes a move in (1, 2)
        Then user O wins

Acceptance Tests
================
## TicTacToe

### Create Game

    * Scenario: User creates a game
        When a user creates a game
        Expect game to be create by user

### Join Game

    * Scenario: User joins a game
        When a user creates a game and user joins the game
        Expect game to be created and joined

### Make Move

    * Scenario: User X makes a move
        When user creates a game, a user joins the game
        and user makes move in (1, 1)
        Expect game to be created, joined and
        move to be made in (1, 1)

    * Scenario: User X makes a move
        When user creates a game, a user joins the game,
        user X makes move in (1, 1) and user O makes move in (2, 1)
        Expect game to be created, joined and
        move to be made in (1, 1) and (2, 1)

### Game Draw
Made an acceptance test for each step of the game to a draw

    * Step create game
        When user creates a game
        Expect game to be created

    * Step join game
        When user joins the game
        Expect user to join game

    * Step first move
        When user makes a move in (0, 0)
        Expect move to be made in (0, 0)

    * Step second move
        When user makes a move in (0, 1)
        Expect move to be made in (0, 1)

    * Step third move
        When user makes a move in (0, 2)
        Expect move to be made in (0, 2)

    * Step fourth move
        When user makes a move in (1, 1)
        Expect move to be made in (1, 1)

    * Step fifth move
        When user makes a move in (1, 0)
        Expect move to be made in (1, 0)

    * Step sixth move
        When user makes a move in (1, 2)
        Expect move to be made in (1, 2)

    * Step seventh move
        When user makes a move in (2, 1)
        Expect move to be made in (2, 1)

    * Step eighth move
        When user makes a move in (2, 0)
        Expect move to be made in (2, 0)

    * Step ninth move
        When user makes a move in (2, 2)
        Expect move to be made in (2, 2)
        and game to be a draw

### Player X Wins

    * Player X wins
        When user creates a game, user joins a game,
        move is made (1, 0), (0, 1), (1, 2), (0, 2),
        (1, 1)
        Expect game to be over and X to have won

### Player O Wins

    * Player O wins
        When user creates a game, user joins a game,
        move is made (1, 0), (0, 1), (1, 2), (0, 2),
        (2, 1), (0, 0)
        Expect game to be over and O to have won

## Test Environment

### Acceptance URL

    Expect environment variable ACCEPTANCE_URL to be defined

Capacity Tests
==============
Can play 1000 games to a draw in 8 seconds.

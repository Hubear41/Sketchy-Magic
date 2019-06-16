# Sketchy Magic
## Overview

Sketchy Magic is simple game about protecting a recently found treasure. The gameplay focuses on casting spells by drawing different shapes to knock out incoming bandits. The bandits will try to steal the treasure in the center of the map while the player tries to defend.

Powerful spells can be cast by drawing shapes with the mouse. Triangles and circles and set traps on the ground or cause big explosions. 

The game ends when a bandit successfully escapes with the treasure or the player defeats all the enemies in that round. If a bandit is defeated while carrying the treasure, it will drop and the map will re-orient itself with the treasure's new position as the center.

Sketchy Magic is inspired by [Magicka](https://en.wikipedia.org/wiki/Magicka) where a wizard casts different magic based on the current element

## Functionality
* Players will be able to cast spells by drawing shapes over parts of the map.
* Enemies will be generated at the edges of the map and will head towards the crystal.
* If an enemy carrying the crystal is defeated, the map will re-center onto that location.
* The game ends if the crystal leaves the map.

### Wireframes

[Wireframe layout](https://wireframe.cc/OzQuLF)

## MVPs
- [ ] Basic visuals and designs for the player and enemies.
- [x] Player cast spells by drawing shapes.
- [x] Enemies will go after the crystal and try to leave the screen if the crystal has been captured.
- [ ] Enemies that succeed in leaving causes a 'Game Over'.

## Architecture and Technologies

The project will be implemented with the following technologies:
* Vanilla Javascipt.
* `HTML5 Canvas` for rendering on to the DOM.
* `Paper.js` for mouse movement detection and vector calcultions.
* `WebAudioAPI` as an audio player for music and sound effects.
* Webpack to bundle and serve up various scripts.

The main files in the project will be:

* `game.js` is the main structure of the canvas.
* `Player.js` is responsible for all player controls and capturing mouse movements.
* `Spells.js` uses mouse movements to determine what spell is used.

## Implementation Timeline

**Day 1** 

- [x] Complete basic skeleton and game functionality.
- [x] Review documentation on `Paper.js`.
- [x] Complete player's ability to draw on map.

**Day 2**

- [ ] Complete player avatar movements and basic attacks.
- [x] Complete player spell casting through mouse drawings ( atleast 2 shapes ).
- [ ] Start creating enemy designs and AI.

**Day 3** 

- [x] Allow enemies to pick up and move with treasure.
- [ ] Have the map re-orient when crystal is dropped
- [ ] Have the game run several rounds with increasing enemies.

**Day 4** 

- [x] Add flair to magic that is cast.
- [ ] Add Music and Sound Effects.
- [ ] Finish styling page.
- [ ] Finish any outstanding MVPS.

## Bonus Features

* Replace enemies and player avatar with sprites.
* Add more shapes & spells as rewards from completing levels.
* Add more enemy types.
* Add different level designs to accomdate new enemies.
* Player can only have 4 spells at a time. Have a spell manager interface.
* Add boss enemy types for final round of each level.


# Sketchy Magic
## Overview

Sketchy Magic is simple game about protecting a recently found treasure. The gameplay focuses on casting spells by drawing different shapes to knock out incoming bandits. The bandits will try to steal the treasure in the center of the map while the player tries to defend.

Powerful spells can be cast by drawing shapes with the mouse. Triangles and circles and set traps on the ground or cause big explosions. 

The game ends when a bandit successfully escapes with the treasure or the player defeats all the enemies in that round. If a bandit is defeated while carrying the treasure, it will drop and the map will re-orient itself with the treasure's new position as the center.


## Functionality
* Players will be able to cast spells by drawing shapes over parts of the map.
* Enemies will be generated at the edges of the map and will head towards the crystal.
* If an enemy carrying the crystal is defeated, the map will re-center onto that location.
* The game ends if the crystal leaves the map.

### Wireframes

![](https://wireframe.cc/OzQuLF)

## MVPs
[] Basic visuals and designs for the player and enemies.
[] Player cast spells by drawing shapes.
[] Enemies will go after the crystal and try to leave the screen if the crystal has been captured.
[] Enemies that succeed in leaving causes a 'Game Over'.
[] The map re-centers when an enemy that is carrying a crystal is defeated.

## Architecture and Technologies

The project will be implemented with the following technologies:
* Vanilla Javascipt.
* `HTML5 Canvas` for rendering on to the DOM.
* `Paper.js` for drawing with the mouse as well as rendering.
* Webpack to bundle and serve up various scripts.

## Implementation Timeline

**Day 1** 

[] Complete basic skeleton and game functionality.
[] Review documentation on `Paper.js`.
[] Complete player's ability to draw on map.

**Day 2**

[] Complete player avatar movements, appearance, and basic attacks.
[] Complete player spell casting through mouse drawings.
[] Start creating enemy designs and AI.

**Day 3** 

[] Allow enemies to pick up and move with crystal.
[] Have the map re-orient when crystal is dropped
[] Complete at least 2 enemy types and their functionality.
[] Have the game run several rounds with increasing enemies.

**Day 4** 

[] Add flair to magic that is cast.
[] Finish styling page.
[] Finish any outstanding MVPS.

## Bonus Features

* Add more shapes & spells as rewards from completing levels.
* Add more enemy types.
* Add different level designs to accomdate new enemies.
* Player can only have 4 spells at a time. Have a spell manager interface.
* Add boss enemy types for final round of each level.

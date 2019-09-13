### MVPs

Ogoria is a 2d interactive game in which users control a character unit with their mouse, with the goal of accumulating as much mass as possible through consumption of food units.

- landing page: game start
- player unit which smoothly resizes bigger on consumption of food
- food units which disappear on consumption
- game view which resizes to accomadate growing character unit
- game pause/play
- music pause/play
- obstacle units which cause player unit, on contact, to be penalized in some way eg shrink


### Tech, libraries, APIs

The game will use vanilla Javascript, HTML, CSS, and the canvas API for drawing game graphics. Technical challenges include keeping the game view centered on the user's unit while the unit moves, and ensuring food units do not spawn near areas where food units have recently been consumed. The former will be addressed by resizing the game view to 'zoom out' when certain mass thresholds have been reached. The latter will be addressed by restricting new food units to only spawn in areas outside of approximately twice the perimeter of the current game view.


### Implementation Timeline

Day 1
- configure webpack, project skeleton
- landing page: game start option, links to github/portfolio
- start writing basic unit and game classes

Day 2
- finish unit and game classes
- add player class, inherit from unit class
- handle camera view on player unit resizing

Day 3
- handle music and game play/pause
- add obstacle units
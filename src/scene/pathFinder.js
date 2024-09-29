import * as THREE from 'three';

function aStarFindPath(startPosition, endPosition, scene, meshesPool) {

  const startPositionRounded = roundVector(startPosition);
  const endPositionRounded = roundVector(endPosition);
  endPositionRounded.y = 0;

  const reachGoalTreshold = 0.1;
  
  let endPositionIsFree = checkPositionIsFree(endPositionRounded)

  if (endPositionIsFree) {
    let openList = [];
    let closeList = [];
  
    openList.push({
      parent: null,
      startToCurrentDist: 0, endToCurrentDist: 0, weight: 0,
      position: startPositionRounded
    })
  
    // Validate input
    let emgStoper = 0
  
    while (openList.length > 0) {
  
      // Find current with lowest f
      const current = openList.reduce((lowest, current) => {
        return current.weight < lowest.weight ? current : lowest;
      });
  
      emgStoper += 1
      if (emgStoper > 1000) {
        const final = closeList.reduce((lowest, current) => {
          return current.endToCurrentDist < lowest.endToCurrentDist ? current : lowest;
        });
        const path = extractPositions(final);
        path.reverse();
        return path;
      }

      removeFromList(openList, current);

      closeList.push(current);
      
      const distanceToEnd = current.position.distanceTo(endPositionRounded);
      if (distanceToEnd < reachGoalTreshold) {
        const path = extractPositions(current);
        path.reverse();
        return path;
      }
  
      const children = generateChildren(current.position)
  
      for (const child of children) {
        child.parent = current;
  
        const existsInCloseList = closeList.some(item => 
          item.position.x === child.position.x &&
          item.position.y === child.position.y &&
          item.position.z === child.position.z
        );
        if (existsInCloseList) {
          continue; 
        }
  
        child.startToCurrentDist = current.startToCurrentDist + 1;
        child.endToCurrentDist = child.position.distanceTo(endPositionRounded);
        child.weight = child.startToCurrentDist + child.endToCurrentDist;
  
        const sameDestinationWays = openList.filter(item => 
          item.position.x === child.position.x &&
          item.position.y === child.position.y &&
          item.position.z === child.position.z
        );
        if (sameDestinationWays.length > 0) {
          const betterWayExists = sameDestinationWays.some(item =>
            item.startToCurrentDist < child.startToCurrentDist
          )
          if (betterWayExists) {
            continue;
          }
          else {
            for (const wayPoint of sameDestinationWays) {
              removeFromList(openList, wayPoint);
            }
          }
        }
        openList.push(child);
      }
    }
  }


  function generateChildren(position) {
    const children = []
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i != 1 || j != 1) {
          const xOffset = -1 + i;
          const zOffset = -1 + j;

          const xPosition = position.x + xOffset;
          const zPosition = position.z + zOffset;

          const finalPosition = new THREE.Vector3(xPosition, 0, zPosition);

          const finalPositionIsFree = checkPositionIsFree(finalPosition);

          if (finalPositionIsFree) {
            children.push({
              parent: null,
              startToCurrentDist: 0, endToCurrentDist: 0, weight: 0,
              position: finalPosition
            });
          }
        }
      }
    }
    return children;
  }


  function removeFromList(list, object) {
    const index = list.findIndex(item => item === object);
    if (index !== -1) {
      list.splice(index, 1);
    }
  }


  function checkPositionIsFree(position) {
    const obstacles = meshesPool.obstacles;

    let pointInsideMesh = false; 
    
    // Define the box area
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const areaMesh = new THREE.Mesh(geometry, material);
    areaMesh.position.set(position.x, 0, position.z);

    const areaBox = new THREE.Box3().setFromObject(areaMesh);

    for (const mesh of obstacles) {
      
      const meshBox = new THREE.Box3().setFromObject(mesh);

      if (areaBox.intersectsBox(meshBox)) {
        pointInsideMesh = true;
        break;
      }
    }
    
    return !pointInsideMesh;
  }


  function extractPositions(obj, positions = []) {
    if (obj.position) {
        positions.push(obj.position);
    }
    
    if (obj.parent) {
        extractPositions(obj.parent, positions);
    }
    
    return positions;
  }


  function roundVector(vector) {
    return new THREE.Vector3(
      Math.round(vector.x),
      Math.round(vector.y),
      Math.round(vector.z)
    );
  }
}

export { aStarFindPath }
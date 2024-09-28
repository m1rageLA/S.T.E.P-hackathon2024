import * as THREE from 'three';

function createListener() {

  const inputMap = {
    mouseDown: false,
    mouseUp: false,
    mouseMove: false,
    event: undefined
  }

  function resetInputMap() {
    inputMap.mouseDown = false;
    inputMap.mouseUp = false;
    inputMap.mouseMove = false;
    inputMap.event = undefined;
  }

  function onMouseDown(event) {
    inputMap.mouseDown = true;
    inputMap.event = event;
  }

  function onMouseUp(event) {
    inputMap.mouseUp = true;
    inputMap.event = event;
  }
  
  function onMouseMove(event) {
    inputMap.mouseMove = true;
    inputMap.event = event;
  }

  return {
    onMouseDown,
    onMouseUp,
    onMouseMove,
    resetInputMap,
    inputMap
  }
}

export { createListener };
import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.abilities.elevation = true;
  }
}

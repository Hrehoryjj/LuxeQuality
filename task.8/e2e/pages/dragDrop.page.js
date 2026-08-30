const BasePage = require('./base.page');

class DragDropPage extends BasePage {
  get navDragButton() { return '~Drag'; }

  get pairs() {
    return ['l1', 'c1', 'r1', 'l2', 'c2', 'r2', 'l3', 'c3', 'r3'];
  }

  get congratsTitle() { return '//*[@text="Congratulations"]'; }
  get congratsMessage() { return '//*[@text="You made it, click retry if you want to try it again."]'; }
  get retryButton() { return '~button-Retry'; }

  async openDragScreen() {
    await this.tap(this.navDragButton);
  }

  async dragElementToDropZone(suffix) {
  const source = await $(`~drag-${suffix}`);
  const target = await $(`~drop-${suffix}`);
  const sourceRect = await source.getElementRect(source.elementId);
  const targetRect = await target.getElementRect(target.elementId);

  const startX = sourceRect.x + sourceRect.width / 2;
  const startY = sourceRect.y + sourceRect.height / 2;
  const endX = targetRect.x + targetRect.width / 2;
  const endY = targetRect.y + targetRect.height / 2;

  await driver.action('pointer')
    .move({ x: Math.floor(startX), y: Math.floor(startY) })
    .down()
    .move({ x: Math.floor(endX), y: Math.floor(endY), duration: 500 })
    .up()
    .perform(true);
}

  async completeAllDragAndDrops() {
    for (const suffix of this.pairs) {
      await this.dragElementToDropZone(suffix);
    }
  }

  async getCongratsMessage() {
    return this.getText(this.congratsMessage);
  }
}

module.exports = new DragDropPage();
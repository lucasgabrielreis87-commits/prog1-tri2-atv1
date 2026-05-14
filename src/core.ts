/**
 * @todo
 * known issues:
 * - getItems needs to await loadListFromDisk()
 */

// class Item_ { 
//   public title: string
//   constructor(title: string) {
//     this.title = title
//   }
// }

class Item {
  constructor(public title: string) { }
}

class TodoList {
  private items: Item[] = []
  private filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
    this.readListFromDisk()
  }

  private async saveListToDisk() {
    const file = Bun.file(this.filePath)
    const data = JSON.stringify(this.items)
    await file.write(data)
  }

  private async readListFromDisk() {
    const file = Bun.file(this.filePath)
    // const text = await file.text()
    // const data = JSON.parse(text)
    const data = await file.json()
    this.items = data.map((v: any) => {
      return new Item(v.title)
    })
  }

  /**
   * Adiciona um novo item na lista de item
   */
  async addItem(item: Item) {
    this.items.push(item)
    await this.saveListToDisk()
  }

  /**
   * Remove um item da lista de item pelo indice
   */
  async removeItem(index: number) {
    this.items.splice(index, 1)
    await this.saveListToDisk()
  }

  /**
   * Retona uma cópia da lista de itens
   */
  getItems() {
    return Array.from(this.items)
  }
}
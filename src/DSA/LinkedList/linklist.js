class MyLinkedlist {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  addAtHead(val) {
    let newNode = new NewNode(val);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  addAtTail(val) {
    let newNode = new NewNode(val);
    if (this.head === null) {
      this.head = newNode;
      this.size++;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
    this.size++;
  }
  addBeforeIndex(index, val) {
    if (index <= 0) {
      this.addAtHead(val);
    } else if (index >= this.size) {
      this.addAtTail(val);
    } else {
      let newNode = new NewNode(val);

      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
      this.size++;
    }
  }

  getElementFromIndex(index) {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.val;
  }
  deletElementFromIndex(index) {
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    current.next = current.next.next;
    this.size--;
    if (index < 0 || index > this.size) return;
    if (index == 1) {
      this.head = this.head.next;
    }
  }
  hasCycle(head) {
    let current = head;
    let seenNodes = new Set();
    while (current) {
      if (seenNodes.has(current)) {
        console.log("linked list has cycle");

        return true;
      }
      seenNodes.add(curr);
      current = current.next;
    }
    console.log("linked list has no cycle");
    return false;
  }
}

class NewNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n3;

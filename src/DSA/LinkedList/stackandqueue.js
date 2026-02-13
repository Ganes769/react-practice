// linkerd lis† witbh the  implentyation of stack

class Mystack {
  constructor() {
    this.s = [];
  }

  push(x) {
    this.s.push(x);
  }
  pop(x) {
    this.s.pop(x);
  }
  top() {
    return this.s.length - 1;
  }
}

const stack = new Mystack();
stack.push(10);
stack.push(100);

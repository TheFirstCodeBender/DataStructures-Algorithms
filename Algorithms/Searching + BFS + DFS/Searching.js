//Traversal Quiz
//If you know a solution is not far from the root of the tree:
//BFS because it will be faster to access the solution since it searches layer by layer starting from root rather than going through the depths of each

//If the tree is very deep and solutions are rare:
//BFS since solutions are rare dfs will be too slow.

//If the tree is very wide:
//DFS depth first search since bfs would take longer to search through each layer.

//If solutions are frequent but located deep in the tree:
//DFS since solutions are deep it will be faster to find things.

//Determining whether a path exists between two nodes:
//DFS since it will check the path between two nodes.

//Finding the shortest path:
//BFS since it goes layer by layer it will potentially find the shortest path faster.

class Node {
  constructor(value){
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }
  insert(value){
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while(true){
        if(value < currentNode.value){
          //Left
          if(!currentNode.left){
            currentNode.left = newNode;
            return this;
          }
          currentNode = currentNode.left;
        } else {
          //Right
          if(!currentNode.right){
            currentNode.right = newNode;
            return this;
          } 
          currentNode = currentNode.right;
        }
      }
    }
  }
  lookup(value){
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    while(currentNode){
      if(value < currentNode.value){
        currentNode = currentNode.left;
      } else if(value > currentNode.value){
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        return currentNode;
      }
    }
    return null
  }
  remove(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    let parentNode = null;
    while(currentNode){
      if(value < currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if(value > currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        //We have a match, get to work!
        
        //Option 1: No right child: 
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            
            //if parent > current value, make current left child a child of parent
            if(currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;
            
            //if parent < current value, make left child a right child of parent
            } else if(currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }
        
        //Option 2: Right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if(parentNode === null) {
            this.root = currentNode.right;
          } else {
            
            //if parent > current, make right child of the left the parent
            if(currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;
            
            //if parent < current, make right child a right child of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }
        
        //Option 3: Right child that has a left child
        } else {

          //find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while(leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }
          
          //Parent's left subtree is now leftmost's right subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if(parentNode === null) {
            this.root = leftmost;
          } else {
            if(currentNode.value < parentNode.value) {
              parentNode.left = leftmost;
            } else if(currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }
      return true;
      }
    }
  }
  BFS() {
    //set current node to root.
    let currentNode = this.root;
    //create list of values
    let list = [];
    //create queue of Nodes
    let queue = [];
    //push initial root node to queue.
    queue.push(currentNode);
    //loop through while the queue is still full.
    while(queue.length > 0) {
      //dequeue the item and set a pointer to it.
      currentNode = queue.shift();
      //push value of currentnode to list.
      list.push(currentNode.value);
      //if current node has a left push it to queue.
      if (currentNode.left) {
        queue.push(currentNode.left)
      }
      //if current node has a right push it to queue.
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return list
    }
    // Recursive version of Breadth first search
  BFSR(queue = [this.root], list = []) {
    //base case
    if (!queue.length) {
      return list;
    }
    let currentNode = queue.shift();
    list.push(currentNode.value)
          //if current node has a left push it to queue.
      if (currentNode.left) {
        queue.push(currentNode.left)
      }
      //if current node has a right push it to queue.
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    return this.BFSR(queue, list)
  }
  DFSInorder() {
    return traverseInOrder(this.root, [])
  }
  DFSPostorder() {
    return traversePostOrder(this.root, [])
  }
  DFSPreorder() {
    return traversePreOrder(this.root, [])
  }
}

function traverseInOrder(node,list) {
  if (node.left) {
    traverseInOrder(node.left, list);
  }
  list.push(node.value)
  if (node.right) {
    traverseInOrder(node.right, list);
  }
  return list;
}
function traversePostOrder(node,list) {
  if (node.left) {
    traversePostOrder(node.left, list);
  }
  
  if (node.right) {
    traversePostOrder(node.right, list);
  }
  list.push(node.value)
  return list;
}
function traversePreOrder(node,list) {
  list.push(node.value)
  if (node.left) {
    traversePreOrder(node.left, list);
  }
  
  if (node.right) {
    traversePreOrder(node.right, list);
  }
  return list;
}

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);

JSON.stringify(traverse(tree.root))

//     9
//  4     20
//1  6  15  170
// InOrder - [1,4,6, 9,15, 20,170]
// preorder - [9,4,1,6,20,15,170]
// postorder - [1,6,4,15,170,20,9]
function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
console.log(tree.DFSPostorder())